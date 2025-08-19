"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/EventForm";
import { useUser } from "@clerk/nextjs";
import { getUser, getusersavailability } from "@/actions/getavaliability";
import { redirect } from "next/navigation";

export default function CreateEventDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [availability, setAvailability] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log(searchParams)
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;

      const dbUser = await getUser(user.id); // your server action
      setUserData(dbUser);

      if (dbUser?.id) {
        const avail = await getusersavailability(dbUser.id);
        setAvailability(avail);
      }
    };

    fetchUser();
  }, [user, searchParams]);

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      if(availability){
        setIsOpen(true);

      }else{
        router.replace("/availability")
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
    }
  };

  return (
    <Drawer open={isOpen}  onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm
          onSubmitForm={() => {
            handleClose();
          }}
        />
        <DrawerFooter className="px-6">
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
