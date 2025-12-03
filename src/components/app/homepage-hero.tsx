"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export function HomepageHero() {
  const [heroImage, setHeroImage] = useState<ImagePlaceholder | null>(null);

  useEffect(() => {
    // Select a random image only on the client-side to prevent hydration mismatch.
    setHeroImage(PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)]);
  }, []);

  if (!heroImage) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <Image
      src={heroImage.imageUrl}
      alt={heroImage.description}
      fill
      priority
      className="object-cover"
      data-ai-hint={heroImage.imageHint}
    />
  );
}
