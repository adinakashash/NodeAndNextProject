"use client"
import ReduxProvider from "@/component/reduxProvider";
import Nuv from "@/component/nuv";
import ImageSlider from "@/component/ImageSlider";
import React from "react";
import { UserProvider } from "@/component/usercontext";
import GoogleAuth from "@/component/loginwithgoogle";

export default function LoginPage() {
  return (
    <UserProvider>
      <ReduxProvider>
         <ImageSlider />
      </ReduxProvider>
      </UserProvider>
    
  );
}
