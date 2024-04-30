"use client";

import { useState, useEffect } from "react";


export const usePhotoSearch = (query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feed, setFeed] = useState<PhotosProps[]>([]);


  //FETCH DATA FROM API
  useEffect(() => {
    const fetchNewData = async () => {
      setLoading(true);
      try {
        const endpoint = query ? `/api/${query}` : "/api/";
        const res = await fetch(endpoint, { next: { revalidate: 60 } });
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
  }, [query]);

  return { loading, feed };
};
