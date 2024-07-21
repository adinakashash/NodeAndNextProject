"use client";
import ReduxProvider from "@/component/reduxProvider";
import Login from "@/component/login";
import React from "react";
import GoogleAuth from "@/component/loginwithgoogle";
import { UserProvider } from "@/component/usercontext";

export default function LoginPage() {
    return (
        <ReduxProvider>
            <UserProvider>
                <Login />
            </UserProvider>
        </ReduxProvider>

    );
}
