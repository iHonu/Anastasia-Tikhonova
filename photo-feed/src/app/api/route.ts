import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1",
    { next: { revalidate: 120 } }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
