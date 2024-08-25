import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";
import { BodyFont } from "@/utils/fonts/nextFonts";

export const metadata: Metadata = {
  title: "Gracenotes",
  description: "Your notes, your way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${BodyFont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
