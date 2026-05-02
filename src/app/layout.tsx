import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contract Songs",
  description: "Spotify API Contract Songs",
};

import { Box } from "@mui/material";

import Providers from "./providers";
import NavBar from "@/components/common/NavBar";

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
          <Box
            sx={{display: "flex", flexDirection: "column"}}
          >
            <NavBar />
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
