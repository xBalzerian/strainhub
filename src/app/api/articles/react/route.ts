import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bfzcjunuuxzhqafuljlh.supabase.co";
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmemNqdW51dXh6aHFhZnVsamxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI5OTg5MSwiZXhwIjoyMDg4ODc1ODkxfQ.h25adAQDZboQXLQ_IEb3gjSJhdXaRhD5wyvY7pQKnzk";

const supabase = createClient(SB_URL, SB_KEY);

export async function POST(request: Request) {
  try {
    const { slug, type } = await request.json();
    if (!slug || !type) return NextResponse.json({ error: "Missing params" }, { status: 400 });
    const valid = ["fire", "heart", "laugh", "wow", "thumbs"];
    if (!valid.includes(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    const { data } = await supabase.from("articles").select("reactions").eq("slug", slug).single();
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const reactions = { ...data.reactions, [type]: (data.reactions?.[type] || 0) + 1 };
    await supabase.from("articles").update({ reactions }).eq("slug", slug);
    return NextResponse.json({ reactions });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
