'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Search() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [feed, setFeed] = useState([]);
    

    const fetchNewData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/${text}`);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setFeed(data.items);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    

  return (
    <div>
      <div className="flex w-full max-w-sm items-center justify-center space-x-2 mt-12 ml-12">
        <Input onChange={e => setText(e.target.value)} type="text" placeholder="Search Tags" />
        <Button onClick={fetchNewData} disabled={loading} type="submit">Search</Button>
      </div>
    </div>
  );
}
