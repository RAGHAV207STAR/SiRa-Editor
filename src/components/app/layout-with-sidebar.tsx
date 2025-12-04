
"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import AppSidebar from '@/components/app/app-sidebar';
import Header from '@/components/app/header';
import BottomNavbar from '@/components/app/bottom-navbar';
import { SidebarInset, useSidebar } from '@/components/ui/sidebar';

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
    const { state } = useSidebar();

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
        <div data-state={state} className={cn("group/sidebar-wrapper flex min-h-screen w-full")}>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col flex-1 min-h-screen">
                    <Header />
                    <main className="flex-grow flex flex-col">{children}</main>
                </div>
            </SidebarInset>
            <BottomNavbar />
        </div>
    )
}
