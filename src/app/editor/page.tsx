
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { EditorLoader } from './editor-loader';
import { GoogleSpinner } from '@/components/ui/google-spinner';

export const metadata: Metadata = {
  title: 'Editor - Create Your Photosheet',
  description: 'Create and customize your passport photos, ID photos, or any photo sheet layout with our easy-to-use online editor. Adjust size, copies, borders, and more.',
};

export default function EditorPage() {
  return (
    <Suspense fallback={
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <GoogleSpinner />
            <p className="text-muted-foreground font-semibold">Initializing Editor...</p>
        </div>
    }>
      <EditorLoader />
    </Suspense>
  );
}
