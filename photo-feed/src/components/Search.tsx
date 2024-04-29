"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import PhotoCard from "@/components/PhotoCard";
import { usePhotoSearch } from "@/components/hooks/usePhotoSearch";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get("query") || "";
  const { loading, feed, debouncedQuery } = usePhotoSearch(query);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row w-fill justify-between items-center md:px-5 mb-8  md:mb-12 mt-16" >
        <div className="mb-6 md:mb-0 ">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search Tags"
            className=""
          />
        </div>
        <div>
        {debouncedQuery && (
          <div className="text-xl md:text-4xl font-semibold uppercase">
            <span className="text-orange-500 font-normal lowercase text-sm mr-4">
              tags:
            </span>
            {debouncedQuery}
          </div>
        )}
        </div>
      
      </div>



      <div className="flex justify-center items-center gap-8 my-auto flex-wrap">
        {/* LOADER */}
        {loading ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
        ) : feed.length > 0 ? (
          feed.map((item) => (
            <PhotoCard
              key={item.date_taken}
              title={item.title}
              media={item.media} 
              date_taken={item.date_taken}
              link={item.link}
              author={item.author}
            />
          ))
        ) : (
          debouncedQuery &&
          !loading && <p>No photos with tag {debouncedQuery} found</p>
        )}
      </div>
    </div>
  );
}
