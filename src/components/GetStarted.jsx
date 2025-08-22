"use client";

import { useUser } from "@clerk/nextjs";
import { getUser } from "@/actions/getavaliability";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GetStarted = () => {
  const { user } = useUser();
  const [Status, setStatus] = useState({});
  const getOnboardStatus = async (id) => {
    const getStatus = await getUser(id);
    if (!getStatus) return null;
    setStatus(getStatus);
  };
  console.log(user?.id);
  useEffect(() => {
    getOnboardStatus(user?.id);
  }, []);
  console.log(Status);

  return (
    <div>
      <Link href={Status.isOnboarded ? "/dashboard" : "/onboard"}>
        <Button size="lg" className="text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default GetStarted;
