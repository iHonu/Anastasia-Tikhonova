import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { tags: string } }
) {
  const tags = params.tags;
  const res = await fetch(
    `https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${tags}`
  );
  const data = await res.json();
  const pureData = data.items

  return NextResponse.json({ pureData });
}
