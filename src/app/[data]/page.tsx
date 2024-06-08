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
    <div className="flex px-[24px] py-1">
      <div>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
      </div>
      <div className="w-[66%]">
        <QRCode value={JSON.stringify(userData)} viewBox={`0 0 128 128`} size={512} level={"Q"} />
      </div>
    </div>
  );
}
