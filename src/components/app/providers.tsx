
"use client";

import { EditorProvider } from '@/context/editor-context';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/context/language-context';
import { Suspense } from 'react';
import { GoogleSpinner } from '../ui/google-spinner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <GoogleSpinner />
        <p className="text-muted-foreground font-semibold">Loading Editor...</p>
      </div>
    }>
      <EditorProvider>
        <LanguageProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </LanguageProvider>
      </EditorProvider>
    </Suspense>
  );
}
