"use client";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Detail({ email }: { email: string }) {
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    trackOne: string;
    trackTwo: string;
    tshirtSize: string;
    uid: string;
  } | null>(null);
  const [userState, setUserState] = useState(0);
  useEffect(() => {
    setUserState(2);
    fetch(
      "https://wow-2024-server.onrender.com/api/confirm-attendee-participation",
      {
        method: "POST",
        body: JSON.stringify({
          "attendee-email": email,
        }),
      }
    ).then(async (res) => {
      if (res.status == 200) {
        const userData = (await res.json())["data"];
        setUserState(1);
        setUserData(userData);
      } else {
        setUserState(-1);
      }
    });
  });
  if (email) {
    if (userState === 2) {
      return <div>Loading..</div>;
    } else if (userState === -1) {
      return <div>Error..</div>;
    }
    if (userState === 0) {
      return (
        <div>
          <div className="p-2 bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-600">
            <h2>Email: {email}</h2>
            <button>Shortlist</button>
          </div>
        </div>
      );
    }
    if (userState == 1 && userData != null) {
      return (
        <div className="flex px-[24px] py-1">
          <div>
            <p>{userData["name"]}</p>
            <p>{userData["email"]}</p>
          </div>
          <div className="w-[66%]">
            <QRCode value={userData.toString()} viewBox={`0 0 256 256`} />
          </div>
        </div>
      );
    }
  } else {
    <div>Scan</div>;
  }
}
