"use client";
import ReduxProvider from "@/component/reduxProvider";
import Map from "@/component/map";
import React from "react";
export default function MapPage() {
  return (
    <ReduxProvider>
      <Map />
    </ReduxProvider>
  );
}
