

import React from "react";
import AvailabilityForm from "../availability/_components/AvailabilityForm";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

export default async function Availability() {
  const availability = await getUserAvailability();

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
}
