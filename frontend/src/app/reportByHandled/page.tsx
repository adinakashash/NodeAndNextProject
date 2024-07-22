"use client";
import ReduxProvider from "@/component/reduxProvider";
import ReportsDrawer from "@/component/Viewing_my_reports";
import React from "react";
export default function MapPage() {
  return (
    <ReduxProvider>
      <ReportsDrawer/>
    </ReduxProvider>
  );
}
