"use client";
import { useEffect, useState } from "react";

interface Match {
  id: number;
  name: string;
  scheduled_at: string;
}

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("http://localhost:8000/api/upcoming-matches");
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) return <p>Loading upcoming matches...</p>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Upcoming Matches</h2>
      {matches.length === 0 ? (
        <p>No upcoming matches available.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id} className="mb-2">
              <span className="font-semibold">{match.name}</span> -{" "}
              {new Date(match.scheduled_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
