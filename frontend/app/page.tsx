// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to League of Data</h1>
      <p className="text-center mb-8 max-w-md">
        This is the About Me section. Add a short bio, your interests, or any other info you'd like visitors to see.
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
