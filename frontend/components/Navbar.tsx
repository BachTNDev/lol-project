// components/Navbar.tsx
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-black dark:bg-gray-600 border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4 text-white dark:text-black">
          <li>
            <Link href="/" className="hover:text-gray-300 dark:hover:text-gray-900">Home</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-gray-300 dark:hover:text-gray-900">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/upcoming-matches" className="hover:text-gray-300 dark:hover:text-gray-900">Upcoming Matches</Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
