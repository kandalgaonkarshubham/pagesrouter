import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useFirmStore } from "@/store/firm";


export default function About() {
  const firms = useFirmStore((state) => state.firms);

  // useEffect(() => {
  //   console.log(firms)
  // }, [firms])

  return (
    <div
      className="flex flex-col gap-10 p-8"
    >
      <h1 className="text-emerald-600 font-bold text-3xl">About Page</h1>
      {
        firms.map((firm) => (
          <span key={firm.id}>{firm.id} {firm.name}</span>
        ))
      }
      <Link href={"/"} className="bg-neutral-700 rounded p-2 w-fit">Go to Home</Link>
      {/* <button onClick={() => router.push("/")} className="bg-neutral-700 rounded p-2 w-fit">Go to Home</button> */}
    </div>
  )

}
