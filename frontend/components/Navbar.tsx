// components/Navbar.tsx
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/upcoming-matches" className="hover:text-foreground">Upcoming Matches</Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}