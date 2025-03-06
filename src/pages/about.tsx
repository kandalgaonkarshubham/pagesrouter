import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";

import { useFirmStore } from "@/store/firm";


export default function About() {
  const firms = useFirmStore((state) => state.firms);

  const [navigationButton, setNavigationButton] = useState(false);
  const toggleButton = () => setNavigationButton(!navigationButton);

  const router = useRouter()

  return (
    <div className="w-full flex items-start justify-between p-8">
      <div
        className="flex flex-col gap-10"
      >
        <h1 className="text-emerald-600 font-bold text-3xl">About Page</h1>
        {
          firms.map((firm) => (
            <span key={firm.id}>{firm.id} {firm.name}</span>
          ))
        }

        {navigationButton ?
          <Link href={"/"} className="bg-neutral-700 rounded p-2 w-fit">Go to Home</Link>
          :
          <button onClick={() => router.push("/")} className="bg-neutral-700 rounded p-2 w-fit">Go to Home</button>
        }
      </div>

      <div className="flex flex-col gap-4">
        <button className="bg-emerald-800 rounded p-2" onClick={toggleButton}>{navigationButton ? "Using LINK" : "Using Router"}</button>
      </div>
    </div>
  )

}
