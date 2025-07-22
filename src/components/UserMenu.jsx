"use client"

import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesColumnIncreasing, CircuitBoardIcon } from 'lucide-react'
import React from 'react'

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Events"
          labelIcon={<ChartNoAxesColumnIncreasing size={15} />}
          href="/events"
        />

        <UserButton.Link
          label="Profile"
          labelIcon={<CircuitBoardIcon size={15} />}
          href="/profile"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserMenu
