"use client";
import ReduxProvider from "@/component/reduxProvider";
import Nuv from "@/component/nuv";
import ImageSlider from "@/component/ImageSlider";
import React from "react";
export default function LoginPage() {
  return (
    <ReduxProvider>
      <Nuv />
      <ImageSlider />
    </ReduxProvider>
  );
}
