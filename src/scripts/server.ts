import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MyOAuthProvider } from "./oauth_provider";
import { useUser } from "../context/userContext";

dotenv.config();

const app = express();

const { user } = useUser();
const userId = user?.id;
const PORT = parseInt(process.env.PORT || "3000", 10);
const REDIRECT_URL = process.env.REDIRECT_URL || `http://localhost:${PORT}/oauth/callback`;


const notionOAuth = new MyOAuthProvider({
  redirectUrl: REDIRECT_URL,
  scope: "mcp:read mcp:write",
  userId:userId || ""
});

app.get("/oauth/callback", async (req: Request, res: Response): Promise<void> => {
  try {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    await notionOAuth.handleRedirect(fullUrl);

    res.status(200).type("html").send(`
      <html>
        <body style="font-family:sans-serif; text-align:center; padding-top:40px;">
          <h2>✅ Notion Authorization Successful!</h2>
          <p>You can now return to your app. You may close this tab.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("OAuth redirect error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).send(`<h3>❌ Authorization Failed</h3><pre>${message}</pre>`);
  }
});

app.listen(PORT, async () => {
  console.log(`🟢 Listening on ${REDIRECT_URL}`);
  try {
    await notionOAuth.getAccessToken();
    console.log("✅ Already authorized!");
  } catch {
    await notionOAuth.redirectToAuthorization();
    

  }
});
