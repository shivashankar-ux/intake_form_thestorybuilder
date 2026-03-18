import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Let's Build Your Website — Start Here",
  description: "Tell us about your business in 2 minutes. We'll build you something your competitors can only dream of.",
  openGraph: {
    title:       "Let's Build Your Website",
    description: "Fill our quick form and we'll get back to you within 24 hours.",
    type:        "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise antialiased">{children}</body>
    </html>
  );
}
