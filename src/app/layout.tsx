
import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Suspense } from 'react';
import { GoogleSpinner } from '@/components/ui/google-spinner';
import { Providers } from '@/components/app/providers';
import AppLayout from '@/components/app/app-layout';

const APP_NAME = "SiRa Editor";
const APP_URL = "https://siraeditor.vercel.app";
const APP_DESCRIPTION = "The easiest free online tool to create perfect passport size photos and ID photo layouts on an A4 sheet. Upload, arrange, and get a print-ready file instantly.";
const OG_IMAGE_URL = `${APP_URL}/og-image.png`; // Assuming you'll add an og-image.png to your public folder

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: "SiRa Editor – Free Passport Size Photo Maker for A4 Sheet",
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["passport size photo maker", "passport photo A4 sheet", "photo ko A4 size me kaise print kare", "Aadhaar photo print", "PAN card photo maker", "photo layout tool India", "free passport photo maker"],
  
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: "/",
  },
  
  manifest: "/manifest.json",
  
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: "SiRa Editor – Free Passport Size Photo Maker for A4 Sheet",
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "SiRa Editor - Free Online Passport Photo & A4 Layout Tool",
      },
    ],
    locale: "en_IN",
  },
  
  twitter: {
    card: "summary_large_image",
    title: {
      default: "SiRa Editor – Free Passport Size Photo Maker for A4 Sheet",
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    creator: "@siraeditor", // Replace with your actual Twitter handle if you have one
    images: [OG_IMAGE_URL],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  colorScheme: 'light dark',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SiRa Editor",
  "url": APP_URL,
  "logo": `${APP_URL}/icon-512.png`,
  "description": "Create print-ready passport size photos and ID photo layouts on an A4 sheet for free. Upload your photo, choose your layout, and download instantly.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript enabled.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "SiRa Editor"
  }
};

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3291480910940190" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3291480910940190" crossOrigin="anonymous"></script>
      </head>
      <body className={`font-body antialiased`}>
        <FirebaseClientProvider>
          <Suspense fallback={
            <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
              <GoogleSpinner />
              <p className="text-muted-foreground font-semibold">Loading...</p>
            </div>
          }>
            <Providers>
              <AppLayout>{children}</AppLayout>
            </Providers>
          </Suspense>
        </FirebaseClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
