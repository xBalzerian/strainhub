import { NextRequest, NextResponse } from "next/server";

const INDEX_NOW_KEY = "a14e5a9e73447599bb563f8aa51ae6ce";
const SITE_HOST = "www.strainhub.org";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEX_NOW_KEY}.txt`;

export async function POST(req: NextRequest) {
  try {
    const { slugs } = await req.json();

    if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json({ error: "No slugs provided" }, { status: 400 });
    }

    const urlList = slugs.map((slug: string) =>
      `https://${SITE_HOST}/strains/${slug}`
    );

    const body = {
      host: SITE_HOST,
      key: INDEX_NOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    return NextResponse.json({
      submitted: urlList.length,
      status: res.status,
      urls: urlList,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET — health check
export async function GET() {
  return NextResponse.json({
    key: INDEX_NOW_KEY,
    keyLocation: KEY_LOCATION,
    host: SITE_HOST,
    status: "ready",
  });
}
