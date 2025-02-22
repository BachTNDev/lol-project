'use client'
import { useEffect, useState } from "react";

interface LCKMatch {
  id: number;
  scheduled_at: string;
  best_of: number;
  league: string;
  teams: Array<{
    name: string;
    image_url: string;
  }>;
}

export default function LCKUpcomingMatch() {
  const [match, setMatch] = useState<LCKMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/upcoming-lck-match');
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("No upcoming LCK matches found");
          }
          throw new Error("Failed to fetch match");
        }

        const data = await response.json();
        setMatch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch match');
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, []);

  if (loading) return <p>Loading LCK match...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!match) return <p>No upcoming LCK matches scheduled</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{match.league} Match</h2>
        <p className="text-sm text-gray-600">
          Best of {match.best_of}
        </p>
      </div>

      <div className="flex items-center justify-around mb-4">
        {match.teams.map((team, index) => (
          <div key={team.name} className="text-center">
            <img 
              src={team.image_url} 
              alt={team.name}
              className="h-20 w-20 object-contain mx-auto mb-2"
            />
            <span className="font-medium">{team.name}</span>
            {index === 0 && <span className="mx-4 text-2xl">vs</span>}
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          {new Date(match.scheduled_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </p>
      </div>
    </div>
  );
}