import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { tags: string } }
) {
  const tags = params.tags;
  const res = await fetch(
    `https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${tags}`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
