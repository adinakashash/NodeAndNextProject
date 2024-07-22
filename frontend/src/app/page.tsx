"use client"
import ReduxProvider from "@/component/reduxProvider";
import Nuv from "@/component/nuv";
import ImageSlider from "@/component/ImageSlider";
import React from "react";
import GoogleAuth from "@/component/loginwithgoogle";

export default function LoginPage() {
  return (
      <ReduxProvider>
         <ImageSlider />
      </ReduxProvider>
    
  );
}
