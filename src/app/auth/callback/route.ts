import { NextRequest, NextResponse } from "next/server";

// With implicit flow, tokens come back in the URL hash (client-side).
// This route handles email confirmation links (which use code= param).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  // If there's a code (magic link / email confirm), redirect to a page
  // that will exchange it client-side via Supabase detectSessionInUrl
  if (code) {
    return NextResponse.redirect(`${origin}${next}?code=${code}`);
  }

  // No code, no error — just redirect home
  return NextResponse.redirect(`${origin}/`);
}
