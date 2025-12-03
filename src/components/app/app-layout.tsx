
"use client";

import { Toaster } from "@/components/ui/toaster"
import BottomNavbar from '@/components/app/bottom-navbar';
import Header from '@/components/app/header';
import { EditorProvider } from '@/context/editor-context';
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app/app-sidebar';
import GoogleAnalytics from '@/components/app/google-analytics';
import { LanguageProvider } from '@/context/language-context';
import SessionValidator from "@/components/app/session-validator";
import { cn } from "@/lib/utils";
import { useEffect }from "react";

function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
    const { state } = useSidebar();
    return (
        <div data-state={state} className={cn("group/sidebar-wrapper flex min-h-screen w-full")}>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col flex-1 min-h-screen">
                    <Header />
                    <main className="flex-grow flex flex-col">{children}</main>
                </div>
            </SidebarInset>
            <Toaster />
            <BottomNavbar />
        </div>
    )
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('SW registered: ', registration);
                }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
            });
        }
    }, []);
  return (
    <>
      <GoogleAnalytics />
      <SessionValidator />
      <EditorProvider>
        <LanguageProvider>
          <SidebarProvider defaultOpen={true}>
              <LayoutWithSidebar>
                {children}
              </LayoutWithSidebar>
          </SidebarProvider>
        </LanguageProvider>
      </EditorProvider>
    </>
  );
}

