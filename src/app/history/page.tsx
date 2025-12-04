
import { HistoryLoader } from './history-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Photosheet History',
  description: 'Access, view, and reprint your previously created photo sheets and collages. Your personal history of all generated passport photos and layouts.',
  robots: {
    index: false,
    follow: true,
  },
};

// This is now a server component that wraps the client component.
export default function HistoryPage() {
  // We can perform server-side checks here if needed in the future.
  return (
      <HistoryLoader />
  );
}
