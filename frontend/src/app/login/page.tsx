"use client";
import Login from '@/components/loginUser';
import ReduxProvider from '@/components/reduxProvider';
import React from 'react';
export default function LoginPage() {
  return (
    <ReduxProvider>     
       <Login/>
    </ReduxProvider>

  );
}

