import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import UserMenu from "@/components/UserMenu";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { deleteUser } from "@/lib/deleteUser";

async function Header() {
  await deleteUser();
  await checkUser();
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width="150"
          height="60"
          alt="Schedulrr Logo"
          className="h-16 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link href="?create=true">
          <Button variant="default" className="flex items-center gap-2">
            <PenBox size={18} />
            <span className="hidden sm:inline">Create Event</span>
          </Button>
        </Link>

        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <Button variant={"outline"} className=" cursor-pointer">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <span className="text-[1rem] text-black">v26</span>
      </div>
    </nav>
  );
}

export default Header;
