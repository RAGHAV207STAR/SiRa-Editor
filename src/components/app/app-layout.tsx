
"use client";

import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/app/google-analytics';
import SessionValidator from "@/components/app/session-validator";
import LayoutWithSidebar from "./layout-with-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleAnalytics />
      <SessionValidator />
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
      <Toaster />
    </>
  );
}
