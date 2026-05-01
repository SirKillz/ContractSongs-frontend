import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contract Songs",
  description: "Spotify API Contract Songs",
};

import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
