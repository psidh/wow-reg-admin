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
    <div className="flex items-start px-[24px] py-6 space-x-3">
      <div className="w-[34%]"></div>
      <div className="w-[66%] h-max">
        <QRCode value={JSON.stringify(userData)} className="w-full h-max" />
      </div>
    </div>
  );
}
