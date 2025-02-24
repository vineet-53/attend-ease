"use client";
import AttendanceForm from "@/components/Student/AttendanceForm";
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { redirect } from "next/navigation";

const StudentPage = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [browser, setBrowser] = useState<null | string>(null);

  const getUniqueFp = async () => {
    const fp = await FingerprintJS.load();
    const res = await fp.get();
    return res.visitorId;
  };

  function isMobileDevice() {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  }

  useEffect(() => {
    setBrowser(navigator.userAgent);
    (async () => {
      const fp = await getUniqueFp();
      console.log(fp);
      setFingerprint(fp);
    })();
  }, []);

  if (!isMobileDevice() && process.env.NODE_ENV === "production") {
    return (
      <div className="flex justify-center items-center">
        Login Using Mobile Device
      </div>
    );
  }

  if (!browser?.includes("Firefox") && process.env.NODE_ENV === "production") {
    return (
      <div className="flex justify-center items-center">Login with firefox</div>
    );
  }

  return <AttendanceForm fingerprint={fingerprint} />;
};

export default StudentPage;
