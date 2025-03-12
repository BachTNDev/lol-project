// app/predictions/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Match {
  id: number;
  scheduled_at: string;
  league: {
    id: number;
    abbreviation: string;
  };
  opponents: {
    opponent: {
      name: string;
      image_url?: string;
    };
  }[];
}

interface Prediction {
  matchId: number;
  prediction: string;
}

export default function PredictionsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  // Fetch upcoming matches from your backend
  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("http://localhost:8000/api/upcoming-matches");
        const data: Match[] = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoadingMatches(false);
      }
    }
    fetchMatches();
  }, []);

  // Filter matches by search term (e.g., filtering by team names)
  const filteredMatches = matches.filter((match) => {
    const opponentNames = match.opponents.map((opp) =>
      opp.opponent.name.toLowerCase()
    );
    return opponentNames.some((name) =>
      name.includes(searchTerm.toLowerCase())
    );
  });

  // Handle input changes in the search bar
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  // When a user clicks a match, fetch the prediction for that match
  const handleMatchClick = async (match: Match) => {
    setSelectedMatch(match);
    setLoadingPrediction(true);
    setPrediction(null);
    try {
      // Assume your predictions endpoint accepts a matchId query parameter.
      const res = await fetch(
        `http://localhost:8000/api/predictions?matchId=${match.id}`
      );
      const data: { prediction: string } = await res.json();
      setPrediction({ matchId: match.id, prediction: data.prediction });
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <div className="min-h-screen p-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Match Predictions</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search upcoming matches..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {loadingMatches ? (
        <p>Loading matches...</p>
      ) : filteredMatches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="p-4 border border-gray-700 rounded cursor-pointer hover:bg-gray-800"
              onClick={() => handleMatchClick(match)}
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  {match.opponents
                    .map((opp) => opp.opponent.name)
                    .join(" vs ")}
                </p>
                <p>{new Date(match.scheduled_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMatch && (
        <div className="mt-8 p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-bold mb-2">
            Prediction for Match {selectedMatch.id}
          </h2>
          {loadingPrediction ? (
            <p>Loading prediction...</p>
          ) : prediction ? (
            <p className="text-green-400">{prediction.prediction}</p>
          ) : (
            <p className="text-red-400">No prediction available.</p>
          )}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setSelectedMatch(null)}
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}
