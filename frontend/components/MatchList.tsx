// components/MatchList.tsx
"use client";
import { useEffect, useState } from "react";

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

export default function MatchList({ children }: { children: (matches: Match[]) => React.ReactNode }) {
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

  if (loading) return <div>Loading matches...</div>;

  return children(matches);
}