"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhotoCard from "@/components/PhotoCard";
import { useState, useEffect } from "react";

export default function Search() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState<PhotosProps[]>([]);

  const fetchNewData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${text}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setFeed(data.data.items);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewData();
  }, []);

  return (
    <div className="flex flex-col mx-auto gap-36 items-center justify-center ">
      <div className="flex w-full max-w-sm items-center justify-center space-x-2 mt-12 ml-12">
        <Input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search Tags"
        />
        <Button onClick={fetchNewData} disabled={loading} type="submit">
          Search
        </Button>
      </div>
      <div className="flex justify-center gap-4 flex-wrap max-w-[60vw]">
        {feed.map((item: PhotosProps) => (
          <PhotoCard
            key={item.date_taken}
            title={item.title}
            media={item.media}
            date_taken={item.date_taken}
          />
        ))}
      </div>
    </div>
  );
}
