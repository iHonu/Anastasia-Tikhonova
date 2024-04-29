import Search from "@/components/Search";
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>

      <div className="max-w-[90rem] mx-auto mt-24 mb-12">
        <header>
          <h1 className="text-6xl uppercase text-end font-semibold">Flickr Photo Feed</h1>
         <h2 className="text-end uppercase">Search for any image</h2>
        </header>
      <Suspense>
      <Search />
      </Suspense>
      </div>
     
      
    </main>
  );
}
