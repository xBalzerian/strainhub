import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { secret, slugs } = await req.json();

  // Validate secret
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
    return NextResponse.json({ error: "No slugs provided" }, { status: 400 });
  }

  const revalidated: string[] = [];
  const errors: string[] = [];

  for (const slug of slugs) {
    try {
      revalidatePath(`/strains/${slug}`);
      revalidated.push(slug);
    } catch (err) {
      errors.push(slug);
    }
  }

  return NextResponse.json({
    revalidated,
    errors,
    timestamp: new Date().toISOString(),
  });
}
