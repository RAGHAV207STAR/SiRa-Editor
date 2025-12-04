
import type { Metadata } from 'next';
import { ProfileLoader } from './profile-loader';

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
        <ProfileLoader />
    );
}
