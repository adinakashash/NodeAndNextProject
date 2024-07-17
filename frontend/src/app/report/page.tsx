"use client";
import React from "react";
import ReduxProvider from "@/component/reduxProvider";
import Report from "@/component/report";

export default function ReportPage() {
  console.log("ReportPage");

  return (
    <ReduxProvider>
      <Report />
    </ReduxProvider>
  );
}
