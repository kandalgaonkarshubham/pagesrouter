import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useFirmStore } from "@/store/firm";

export default function Home() {
  const firms = useFirmStore((state) => state.firms);
  const fetchALlFirms = useFirmStore((state) => state.fetchAllFirms);
  const cleanFirms = useFirmStore((state) => state.cleanFirms);

  const [navigationButton, setNavigationButton] = useState(false);
  const toggleButton = () => setNavigationButton(!navigationButton);

  const router = useRouter()

  return (
    <div className="w-full flex items-start justify-between p-8">
      <div
        className="flex flex-col gap-10"
      >
        <h1 className="text-emerald-600 font-bold text-3xl">Home Page</h1>
        {
          firms.map((firm) => (
            <span key={firm.id}>{firm.id} {firm.name}</span>
          ))
        }

        {navigationButton ?
          <Link href={"/about"} className="bg-neutral-700 rounded p-2 w-fit">Go to About</Link>
          :
          <button onClick={() => router.push("/about")} className="bg-neutral-700 rounded p-2 w-fit">Go to About</button>
        }
      </div>

      <div className="flex flex-col gap-4">
        <button className="bg-emerald-800 rounded p-2" onClick={toggleButton}>{navigationButton ? "Using LINK" : "Using Router"}</button>
        <button className="bg-sky-800 rounded p-2" onClick={fetchALlFirms}>Fetch Firms</button>
        <button className="bg-rose-800 rounded p-2" onClick={cleanFirms}>Clean Firms</button>
      </div>
    </div>
  );
}
