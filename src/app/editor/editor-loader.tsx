
"use client";

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { GoogleSpinner } from '@/components/ui/google-spinner';

const EditorWizard = dynamic(() => import('@/components/app/editor-wizard'), {
    loading: () => <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <GoogleSpinner />
        <p className="text-muted-foreground font-semibold">Initializing Editor...</p>
    </div>,
    ssr: false
});

export function EditorLoader() {
    const searchParams = useSearchParams();
    const historyId = searchParams.get('historyId');
    const copies = searchParams.get('copies');

    return <EditorWizard historyId={historyId} copies={copies} />;
}
