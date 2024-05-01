"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import PhotoCard from "@/components/PhotoCard";
import { usePhotoSearch } from "@/components/hooks/usePhotoSearch";
import Tags from "@/components/Tags";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputValue, setInputValue] = useState("");
  const query = searchParams.get("query") || "";

  const { loading, feed } = usePhotoSearch(query);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set("query", inputValue);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setInputValue("");
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", tag);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {/* SEARCH AND BUTTON */}
      <div className="flex flex-col md:flex-row w-fill justify-between items-center md:mx-8 lg:mx-4 mb-2 md:mb-12 mt-8 md:mt-36">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6 md:mb-0 w-fill">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Search Tags"
            className="w-full md:w-[16rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[28rem]"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-black text-white border-2 border-black hover:bg-lime-300 hover:text-black transition-colors duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
        <Tags handleTagClick={handleTagClick} query={query} />
      </div>

      {/* PHOTO FEED */}
      <div className="flex justify-center items-center gap-8 my-auto flex-wrap">
        {loading ? (
          // LOADING SPINNER
          <div
            className="inline-block h-8 w-8 mt-36 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
          query &&
          !loading && (
            <p className="mt-12 md:mt-24 text-xl md:text-2xl">
              No photos with tag <span className="font-bold">{query} </span>
              found
            </p>
          )
        )}
      </div>
    </div>
  );
}
