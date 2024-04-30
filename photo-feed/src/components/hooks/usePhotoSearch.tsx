"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export const usePhotoSearch = (query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feed, setFeed] = useState<PhotosProps[]>([]);
  const [debouncedQuery] = useDebounce(query, 750);


  //FETCH DATA FROM API
  useEffect(() => {
    const fetchNewData = async () => {
      setLoading(true);
      try {
        const endpoint = debouncedQuery ? `/api/${debouncedQuery}` : "/api/";
        const res = await fetch(endpoint, { next: { revalidate: 120 } });
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

  return { loading, feed, debouncedQuery };
};
