"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function UserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const queryData = searchParams.get("data");
    if (queryData) {
      setUserData(JSON.parse(decodeURIComponent(queryData)));
    }
  });

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center h-screen">
      <QRCode
        value={JSON.stringify({
          t1: userData.trackOne,
          t2: userData.trackTwo,
          e: userData.email,
          s: userData.tshirtSize,
        })}
        viewBox={`0 0 64 64`}
        size={50}
        level={"Q"}
        style={{ height: "auto", maxWidth: "80%", width: "60%" }}
      />
    </div>
  );
}
