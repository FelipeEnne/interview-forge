import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "InterviewForge",
  description: "Technical interview practice by topic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocaleProvider>
          <AppHeader />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
