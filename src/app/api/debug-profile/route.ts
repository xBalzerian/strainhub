import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "4b1bf43f-0b5a-4a10-b946-1894449f9c7d";
  
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile, error: profileErr } = await admin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const { error: updateErr } = await admin
    .from("profiles")
    .update({ chats_today: 1, chats_date: new Date().toISOString().split("T")[0] })
    .eq("id", userId);

  return NextResponse.json({
    profile,
    profileErr: profileErr?.message,
    updateErr: updateErr?.message,
    columns: profile ? Object.keys(profile) : [],
  });
}
