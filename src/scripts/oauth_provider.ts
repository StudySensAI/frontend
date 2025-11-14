import { Buffer } from "buffer";
import fetch from "node-fetch";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { OAuthTokens, OAuthProviderLike } from "./types.js";
import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config();

/**
 * MyOAuthProvider
 * --------------------------------------------------
 * Handles Notion OAuth flow and securely stores tokens
 * in the Supabase `notion_connections` table.
 * --------------------------------------------------
 */
export class MyOAuthProvider implements OAuthProviderLike {
  private supabase: SupabaseClient;

  constructor(
    private config: {
      redirectUrl: string;
      scope: string;
      userId: string; // 👈 The ID of the currently authenticated user in your app
    }
  ) {
    // Initialize Supabase client
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_API_KEY! // Server key required for DB writes
    );
  }

  /**
   * Step 1: Redirect user to Notion's OAuth page
   */
  async redirectToAuthorization(): Promise<void> {
    const authUrl = new URL("https://api.notion.com/v1/oauth/authorize");
    authUrl.searchParams.set("client_id", process.env.NOTION_CLIENT_ID!);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("owner", "user");
    authUrl.searchParams.set("redirect_uri", this.config.redirectUrl);
    authUrl.searchParams.set("scope", this.config.scope);

    console.log("🔗 Visit this URL to authorize Notion access:");
    console.log(authUrl.toString());
  }

  /**
   * Step 2: Handle Notion redirect and exchange code for tokens
   */
  async handleRedirect(redirectUrl: string): Promise<void> {
    const code = new URL(redirectUrl).searchParams.get("code");
    if (!code) throw new Error("Missing authorization code in redirect URL.");

    console.log("🔁 Exchanging authorization code for tokens...");

    const basicAuth = Buffer.from(
      `${process.env.NOTION_CLIENT_ID!}:${process.env.NOTION_CLIENT_SECRET!}`
    ).toString("base64");

    const res = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.config.redirectUrl,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Token exchange failed: ${text}`);
    }

    const tokens = JSON.parse(text) as OAuthTokens;

    // Save tokens to Supabase
    await this.saveTokensToSupabase(tokens);

    console.log("✅ Tokens saved to Supabase (notion_connections table)");
  }

  /**
   * Step 3: Save Notion tokens to Supabase
   */
  private async saveTokensToSupabase(tokens: OAuthTokens): Promise<void> {
    const owner = tokens.owner?.user ?? {};

    const { error } = await this.supabase
      .from("notion_connections")
      .upsert(
        {
          user_id: this.config.userId,
          access_token: tokens.access_token,
          token_type: tokens.token_type,
          refresh_token: tokens.refresh_token,
          bot_id: tokens.bot_id,
          workspace_name: tokens.workspace_name,
          workspace_icon: tokens.workspace_icon,
          workspace_id: tokens.workspace_id,

          owner_type: tokens.owner?.type,
          owner_object: owner.object,
          owner_id: owner.id,
          owner_name: owner.name,
          owner_avatar_url: owner.avatar_url,
          owner_user_type: owner.type,
          owner_user_email: owner.person?.email,

          duplicated_template_id: tokens.duplicated_template_id,
          request_id: tokens.request_id,
          raw_response: tokens,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,workspace_id" }
      );


    const notion = new Client({
      auth: tokens.access_token,
    });

    const response = await notion.search({
      filter: {
        property: "object",
        value: "page",
      },
    });

    // Extract pages from the search response
    const selectedPages = response.results.filter(
      (result: any) => result.object === "page"
    );

    // Insert pages into Supabase using different variable names to avoid conflicts
    const { data: insertData, error: insertError } = await this.supabase
      .from("notion_pages")
      .insert(
        selectedPages.map((p: any) => ({
          user_id: "165dba29-36eb-4e88-9889-81a61b0ef3a0",
          page_id: p.id,
          page_name: p.properties?.title?.title?.[0]?.plain_text || "Untitled",
        }))
      );

    if (insertError) {
      console.error("❌ Failed to insert pages into Supabase:", insertError);
      throw insertError;
    }

    console.log(`✅ Inserted ${selectedPages.length} pages into Supabase`);

    if (error) {
      console.error("❌ Failed to save tokens in Supabase:", error);
      throw error;
    }
  }

  /**
   * Step 4: Get Access Token (for authenticated Notion API calls)
   */
  async getAccessToken(): Promise<string> {
    const { data, error } = await this.supabase
      .from("notion_connections")
      .select("access_token")
      .eq("user_id", this.config.userId)
      .maybeSingle();

    if (error) {
      console.error("❌ Failed to fetch access token:", error);
      throw error;
    }

    if (!data?.access_token) {
      throw new Error("No access token found. Please connect Notion first.");
    }

    const accessToken = data.access_token;

    

    return accessToken;
  }
}

