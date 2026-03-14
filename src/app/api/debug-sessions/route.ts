import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Check if table exists
  const { data: tables, error: tableErr } = await admin
    .from("chat_sessions")
    .select("id")
    .limit(1);

  // 2. Try a direct insert with a fake UUID that won't violate FK if we use service role bypass
  // We'll insert without FK by using a known auth user first
  const { data: users, error: userErr } = await admin.auth.admin.listUsers({ perPage: 1 });
  
  const testUserId = users?.users?.[0]?.id || null;
  let insertResult = null;
  let insertError = null;
  
  if (testUserId) {
    const { data, error } = await admin
      .from("chat_sessions")
      .upsert({
        id: "debug_test_session_001",
        user_id: testUserId,
        messages: [{ role: "user", content: "debug test" }],
        preview: "debug test",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" })
      .select();
    insertResult = data;
    insertError = error;
  }

  return NextResponse.json({
    tableCheck: { data: tables, error: tableErr },
    firstUserId: testUserId,
    insertTest: { data: insertResult, error: insertError },
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  });
}
