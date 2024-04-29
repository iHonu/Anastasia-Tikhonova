import Search from "@/components/Search";
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <Suspense>
      <Search />
      </Suspense>
      
    </main>
  );
}
