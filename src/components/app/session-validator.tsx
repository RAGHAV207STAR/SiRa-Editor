
"use client";

import { useUser } from '@/firebase';

export default function SessionValidator() {
  // The user update logic has been moved into the useUser hook
  // to ensure it runs consistently whenever the user object is accessed.
  useUser();

  return null; // This component does not render anything
}
