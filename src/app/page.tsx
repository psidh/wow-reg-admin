"use client";
"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Detail from "@/components/Detail";

export default function Home() {
  const [data, setData] = useState<any | null>(null);
  const [inputEmail, setInputEmail] = useState<string>("");

  const email = data?.[0]?.rawValue || inputEmail;

  const handleButtonClick = () => {
    if (inputEmail !== "") {
      setData([{ rawValue: inputEmail }]);
      toast.success("Found Result")
    }
  };

  console.log(email);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="pt-8 pb-4">Admin | Scanner</h1>
      {email ? (
        <>
          <Detail email={email} />
        </>
      ) : (
        <>
          <p>Scan QR</p>
        </>
      )}
      <Scanner onScan={(result) => setData(result)} />
      <div className="flex items-center justify-center mb-24">
        <input
          type="text"
          title="email"
          typeof="email"
          placeholder="email"
          className="py-2 px-4 border"
          value={inputEmail}
          onChange={(event) => setInputEmail(event.target.value)}
        />
        <button
          className="bg-black py-2 px-6 text-white"
          onClick={handleButtonClick}
        >
          Get
        </button>
      </div>
    </div>
  );
}
