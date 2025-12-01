
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = "https://siraeditor.vercel.app/sitemap.xml";
  const hostUrl = "https://siraeditor.vercel.app";

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // Disallow all API routes
          '/profile/',  // Disallow profile pages
          '/login',     // Disallow login page
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/profile/',
          '/login',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/profile/',
          '/login',
        ],
      },
    ],
    sitemap: sitemapUrl,
    host: hostUrl,
  };
}
