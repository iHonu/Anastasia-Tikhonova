"use client";


import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import PhotoCard from "@/components/PhotoCard";
import { usePhotoSearch } from "@/components/hooks/usePhotoSearch";
import Tags from "@/components/Tags";

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
    <div>
      <div className="flex flex-col md:flex-row w-fill justify-between items-center md:mx-8 lg:mx-4 mb-2 md:mb-12 mt-8 md:mt-36">
        <div className="mb-6 md:mb-0 w-fill md:w-1/3 ">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search Tags"
          />
        </div>
        <div>
          <Tags  handleTagClick={handleSearch} debouncedQuery={debouncedQuery} />
        </div>
      </div>

      <div className="flex justify-center items-center gap-8 my-auto flex-wrap">
        {loading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
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
