import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sophie's Tours - Unique Safari & Travel Experiences",
  description: "Discover extraordinary travel experiences with Sophie's Tours. From African safaris to cultural immersions, embark on transformative journeys with our Zinzino health integration program.",
  keywords: "safari, travel, tours, africa, zinzino, health, wellness, adventure",
  authors: [{ name: "Sophie's Tours" }],
  viewport: "width=device-width, initial-scale=1",
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
