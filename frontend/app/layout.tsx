import Navbar from "@/components/Navbar";
import "@/app/ui/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="ProMatch Analyzer - League of Legends Pro Match Analysis" />
        <title>League of Data</title>
      </head>
      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main> {/* Centered content */}
        <footer className="text-center p-4 text-gray-600">
          © 2025 ProMatch Analyzer. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
