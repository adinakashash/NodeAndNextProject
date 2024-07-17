"use client";
import ReduxProvider from "@/component/reduxProvider";
import Google from "@/component/google";
import React from "react";
export default function LoginPage() {
  return (
    <ReduxProvider>
      <Google />
    </ReduxProvider>
  );
}
