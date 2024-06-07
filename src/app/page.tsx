"use client"
import { Scanner } from "@yudiel/react-qr-scanner";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      hi there
      <Scanner onScan={(result) => console.log(result)} />
    </div>
  );
}
