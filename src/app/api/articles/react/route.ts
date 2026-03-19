import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
