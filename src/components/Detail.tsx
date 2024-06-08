// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Detail({ email }: { email: string }) {
//   const router = useRouter();
//   const [userData, setUserData] = useState<{
//     email: string;
//     name: string;
//     trackOne: string;
//     trackTwo: string;
//     tshirtSize: string;
//     uid: string;
//   } | null>(null);
//   const [userState, setUserState] = useState(0);
//   const [err, setErr] = useState<string | null>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setUserState(2);
//         const res = await fetch(
//           "https://wow-2024-server.onrender.com/api/confirm-attendee-participation",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               attendee_email: email,
//             }),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (res.status === 200) {
//           const userData = (await res.json())["data"];
//           setUserState(1);
//           setUserData(userData);
//         } else {
//           setUserState(-1);
//           setErr(JSON.stringify(await res.json()));
//         }
//       } catch (error: any) {
//         setUserState(-1);
//         setErr(error.message);
//       }
//     };

//     if (email) {
//       fetchData();
//     }
//   }, [email]);

//   const handlePrintQR = () => {
//     if (userData) {
//       const userDataString = encodeURIComponent(JSON.stringify(userData));
//       router.push(`/user?data=${userDataString}`);
//     }
//   };

//   if (email) {
//     if (userState === 2) {
//       return <div>Loading..</div>;
//     } else if (userState === -1) {
//       return <div className="text-center pb-8 pt-2">Error: {err}</div>;
//     }
//     if (userState === 0) {
//       return (
//         <div>
//           <div className="p-2 bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-600">
//             <h2>Email: {email}</h2>
//             <button>Shortlist</button>
//           </div>
//         </div>
//       );
//     }
//     if (userState === 1 && userData !== null) {
//       return (
//         <div className="flex px-[24px] py-1">
//           <button className="bg-black rounded px-4 py-1 my-6 hover:bg-neutral-800 text-white" onClick={handlePrintQR}>Print QR</button>
//         </div>
//       );
//     }
//   } else {
//     return <div>Scan</div>;
//   }
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Detail({ email }: { email: string }) {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    trackOne: string;
    trackTwo: string;
    tshirtSize: string;
    uid: string;
  } | null>(null);
  const [userState, setUserState] = useState(0);
  const [err, setErr] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserState(2);
        const res = await fetch(
          "https://wow-2024-server.onrender.com/api/confirm-attendee-participation",
          {
            method: "POST",
            body: JSON.stringify({
              attendee_email: email,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (res.status === 200) {
          const userData = (await res.json()).data;
          setUserState(1);
          setUserData(userData);
        } else {
          const errorData = await res.json();
          setUserState(-1);
          setErr(errorData.message);  // Extract the message from the error JSON object
        }
      } catch (error: any) {
        setUserState(-1);
        setErr(error.message);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  const handlePrintQR = () => {
    if (userData) {
      const userDataString = encodeURIComponent(JSON.stringify(userData));
      router.push(`/user?data=${userDataString}`);
    }
  };

  if (email) {
    if (userState === 2) {
      return <div>Loading..</div>;
    } else if (userState === -1) {
      return <div className="text-center pb-8 pt-2">Error: {err}</div>;
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
    if (userState === 1 && userData !== null) {
      return (
        <div className="flex px-[24px] py-1">
          <button className="bg-black rounded px-4 py-1 my-6 hover:bg-neutral-800 text-white" onClick={handlePrintQR}>Print QR</button>
        </div>
      );
    }
  } else {
    return <div>Scan</div>;
  }
}
