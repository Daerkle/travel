import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sophie's Tours - Safari & Gesundheitsreisen",
  description: "Entdecken Sie außergewöhnliche Reiseerlebnisse mit Sophie's Tours. Von afrikanischen Safaris bis zu kulturellen Immersionen - begeben Sie sich auf transformative Reisen mit unserem Zinzino-Gesundheitsprogramm.",
  keywords: "safari, reisen, tours, afrika, zinzino, gesundheit, wellness, abenteuer",
  authors: [{ name: "Sophie's Tours" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gradient-to-br from-savanna to-white font-sans">
        {children}
      </body>
    </html>
  );
}
