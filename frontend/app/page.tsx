// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full p-8 bg-cover bg-center" >      
      <h1 className="text-4xl font-bold mb-4">Welcome to League of Data</h1>
      <p className="text-center mb-8 max-w-md">
        ProMatch Analyzer - League of Legends Pro Match Analysis
      </p>
      <Link
        href="/dashboard"
        className="bg-gray-600 text-white px-4 py-2 rounded shadow-hero hover:bg-gray-700 hover:shadow-xl transition-all"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
