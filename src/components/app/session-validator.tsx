
"use client";

import { useEffect } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { usePathname } from 'next/navigation';

export default function SessionValidator() {
  const { user } = useUser(true);
  const firestore = useFirestore(true);
  const pathname = usePathname();

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp(),
      };
      setDocumentNonBlocking(userDocRef, userData, { merge: true });
    }
  }, [user, firestore, pathname]);

  return null;
}
