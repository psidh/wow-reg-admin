"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Detail from "@/components/Detail";

export default function Home() {
  const [data, setData] = useState<any | null>([
    {
      rawValue: "",
    },
  ]);

  const email = data[0].rawValue || "";
  if (email !== "") {
    toast.success("Found Result");
  }
  console.log(email);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <h1 className="py-8">Admin | Scanner</h1>
      <Scanner onScan={(result) => setData(result)} />
      {data ? (
        <>
          <Detail email={email} />
        </>
      ) : (
        <>
          <p>Scan QR</p>
        </>
      )}
    </div>
  );
}
