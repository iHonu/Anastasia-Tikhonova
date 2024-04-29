"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import PhotoCard from "@/components/PhotoCard";
import { useDebounce } from "use-debounce";

export default function Search() {
  const [loading, setLoading] = useState<boolean>(false);
  const [feed, setFeed] = useState<PhotosProps[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const query = searchParams.get("query") || "";
  const [debouncedQuery] = useDebounce(query, 750);

  useEffect(() => {
    const fetchNewData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/${debouncedQuery}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setFeed(data.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewData();
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col mx-auto gap-8 items-center justify-center max-w-[100rem] mt-48">
      <div className="flex w-full justify-between items-end px-24">
        <div className="flex w-full max-w-sm r">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search Tags"
            className=" "
          />
        </div>

        {debouncedQuery && (
          <div className="text-4xl font-semibold  mt-8 px-4 py-2  uppercase">
            <span className="text-orange-500 mr-4 font-normal lowercase text-sm">
              tags:
            </span>
            {debouncedQuery}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-8 my-auto flex-wrap ">
        {loading ? (
          <p>Loading...</p>
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
          <p>No photos with tag {debouncedQuery} found.</p>
        )}
      </div>
    </div>
  );
}
