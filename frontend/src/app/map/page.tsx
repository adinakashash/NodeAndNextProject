"use client";
import ReduxProvider from "@/component/reduxProvider";
import Map from "@/component/map";
import React from "react";
import { UserProvider } from "@/component/usercontext";

export default function MapPage() {
  return (
    <UserProvider>
    <ReduxProvider>
      <Map />
    </ReduxProvider>
    </UserProvider>

  );
}
