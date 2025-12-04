
import type { Metadata } from 'next';
import { EditorLoader } from './editor-loader';

export const metadata: Metadata = {
  title: 'Editor - Create Your Photosheet',
  description: 'Create and customize your passport photos, ID photos, or any photo sheet layout with our easy-to-use online editor. Adjust size, copies, borders, and more.',
};

export default function EditorPage() {
  return (
      <EditorLoader />
  );
}
