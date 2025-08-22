"use client";

import { useUser } from "@clerk/nextjs";
import { getUser } from "@/actions/getavaliability";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GetStarted = () => {
  const { user, isLoaded } = useUser(); // 👈 use isLoaded
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const getOnboardStatus = async (id) => {
    try {
      setLoading(true);
      const getStatus = await getUser(id);
      if (!getStatus) return;
      setStatus(getStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      getOnboardStatus(user.id); // 👈 only run when Clerk is ready
    }
  }, [isLoaded, user?.id]);

  return (
    <div>
      <Link href={status.isOnboarded ? "/dashboard" : "/onboard"}>
        <Button size="lg" disabled={loading} className="text-lg">
          {loading ? "Loading..." : "Get Started"}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default GetStarted;
