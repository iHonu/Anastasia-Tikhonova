import Search from "@/components/Search";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <div className="max-w-[90rem] mx-6 md:mx-auto mt-12 md:mt-24 mb-12 ">
        <header className="mx-4">
          <Link href="/">
            <h1 className="text-3xl md:text-6xl  uppercase text-end font-semibold">
              Flickr Photo Feed
            </h1>
          </Link>
          <h2 className=" px-4 text-end  text-sm  md:text-base uppercase">
            Search for any image
          </h2>
        </header>
        <Suspense>
          <Search />
        </Suspense>
      </div>
    </main>
  );
}
