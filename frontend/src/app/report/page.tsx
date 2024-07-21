"use client";
import React from "react";
import ReduxProvider from "@/component/reduxProvider";
import Report from "@/component/report";
import { UserProvider } from "@/component/usercontext";

export default function ReportPage() {

  return (
    <UserProvider>
    <ReduxProvider>
      <Report />
    </ReduxProvider>
    </UserProvider>

  );
}
