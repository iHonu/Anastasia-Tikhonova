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
    <div className="flex flex-col mx-auto gap-36 items-center justify-center">
      <div className="flex w-full max-w-sm items-center justify-center space-x-2 mt-12 ml-12">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search Tags"
          className="px-4 py-2 border rounded"
        />
      </div>
      <h2 className="text-lg font-semibold text-center mt-8 uppercase">
        {debouncedQuery ? `${debouncedQuery}` : "Search Photos"}
      </h2>
      <div className="flex justify-center items-center gap-8 m-auto flex-wrap max-w-[60vw]">
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
