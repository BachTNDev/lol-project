import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import "@/app/ui/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "League of Data",
  description: "ProMatch Analyzer - League of Legends Pro Match Analysis",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <footer className="text-center p-4 text-muted-foreground">
            © 2025 ProMatch Analyzer. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}