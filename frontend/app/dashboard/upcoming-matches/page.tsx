'use client'
import { useEffect, useState } from "react";
import LeagueColumn from "@/components/LeagueColumn";

interface Match {
  id: number;
  scheduled_at: string;
  league: {
    id: number;
    abbreviation: string;
    image_url?: string;
  };
  opponents: {
    opponent: {
      name: string;
      image_url?: string;
    };
  }[];
}

export default function UpcomingPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/upcoming-matches");
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Group matches by league abbreviation
  const groupedMatches = matches.reduce((acc, match) => {
    const leagueAbbr = match.league.abbreviation;
    if (!acc[leagueAbbr]) acc[leagueAbbr] = [];
    acc[leagueAbbr].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="min-h-screen p-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Matches Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["LCK", "LPL", "LEC", "LTA"].map((league) => (
          <LeagueColumn
            key={league}
            league={league}
            matches={groupedMatches[league] || []}
          />
        ))}
      </div>
    </div>
  );
}