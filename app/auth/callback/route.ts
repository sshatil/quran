import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      // If local, redirect to localhost, else use production domain
      const finalOrigin = isLocalEnv
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_PRODUCTION_URL;

      if (forwardedHost && !isLocalEnv) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${finalOrigin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
