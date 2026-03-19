import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { secret, slugs } = await request.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidatePath("/news");
  for (const slug of (slugs || [])) {
    revalidatePath(`/news/${slug}`);
  }
  return NextResponse.json({ revalidated: slugs || [], timestamp: new Date().toISOString() });
}
