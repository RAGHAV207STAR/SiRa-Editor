
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { GoogleSpinner } from '@/components/ui/google-spinner';
import LoginPageClient from './login-client';


// Metadata for SEO
export const metadata: Metadata = {
  title: 'Login or Sign Up - SiRa Editor',
  description: 'Login to your SiRa Editor account to access your saved photosheet history or create a new account to get started with the best online passport photo maker.',
};


export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 to-blue-100">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <GoogleSpinner />
                    <span className="font-semibold text-lg">Loading...</span>
                </div>
            </div>
        }>
            <LoginPageClient />
        </Suspense>
    );
}
