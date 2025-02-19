// frontend/src/components/UpcomingMatches.tsx
'use client'

import { useEffect, useState } from "react";

interface Match {
  match_id: string;
  team1: string;
  team2: string;
  start_time: string;
}

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches/upcoming")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setError("Failed to fetch upcoming matches.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading upcoming matches...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <ul className="space-y-4">
      {matches.map((match) => (
        <li key={match.match_id} className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            {match.team1} vs {match.team2}
          </h2>
          <p className="text-gray-600">
            Starts at: {new Date(match.start_time).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

