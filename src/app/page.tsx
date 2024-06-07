"use client";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any | null>([
    {
      rawValue: "",
    },
  ]);

  const email = data[0].rawValue || "";
  console.log(email);

  return (
    <div className="flex flex-col items-center justify-center h-screen py-12">
      <Scanner onScan={(result) => setData(result)} />
      {data ? (
        <>
          <div>
            <h2>Email: {email}</h2>
          </div>
        </>
      ) : (
        <>
          <p>Scan QR</p>
        </>
      )}
    </div>
  );
}
