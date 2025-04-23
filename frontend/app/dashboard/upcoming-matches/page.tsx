// app/dashboard/upcoming-matches/page.tsx
"use client";
import MatchList from "@/components/MatchList";
import LeagueColumn from "@/components/LeagueColumn";

export default function UpcomingPage() {
  return (
    <div className="min-h-screen p-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Matches</h1>
      <MatchList>
        {(matches) => {
          // Group matches by league abbreviation
          const groupedMatches = matches.reduce((acc, match) => {
            const leagueAbbr = match.league.abbreviation;
            if (!acc[leagueAbbr]) acc[leagueAbbr] = [];
            acc[leagueAbbr].push(match);
            return acc;
          }, {} as Record<string, typeof matches>);

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["LCK", "LPL", "LEC"].map((league) => (
                <LeagueColumn
                  key={league}
                  league={league}
                  matches={groupedMatches[league] || []}
                />
              ))}
            </div>
          );
        }}
      </MatchList>
    </div>
  );
}