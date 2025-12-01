
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProfileLoader } from './profile-loader';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'Manage your SiRa Editor user profile, update your name, and view your account details.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProfilePage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col flex-1 bg-background p-4 sm:p-6 md:p-8 justify-center items-center">
                <div className="w-full max-w-lg">
                    <Skeleton className="h-10 w-48 mx-auto mb-8" />
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Skeleton className="w-24 h-24 rounded-full" />
                            <Skeleton className="h-8 w-40 mt-2" />
                            <Skeleton className="h-4 w-56 mt-1" />
                        </CardHeader>
                        <CardContent>
                            <Separator />
                            <div className="py-4 space-y-2">
                               <Skeleton className="h-12 w-full" />
                               <Skeleton className="h-12 w-full" />
                            </div>
                            <Separator />
                            <div className="pt-4">
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        }>
            <ProfileLoader />
        </Suspense>
    );
}
