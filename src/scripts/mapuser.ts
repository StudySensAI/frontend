import type { User as SupabaseUser } from "@supabase/supabase-js";
// userContext.ts or types/User.ts
export interface User {
    id: string;
    full_name: string;
    email: string;
  }
  
export function mapSupabaseUser(user: SupabaseUser | null): User | null {
  if (!user) return null;

  return {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? "",
    email: user.email ?? "",
  };
}
