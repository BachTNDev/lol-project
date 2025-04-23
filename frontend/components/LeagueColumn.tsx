// components/LeagueColumn.tsx
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

interface LeagueColumnProps {
  league: string;
  matches: Match[];
}

export default function LeagueColumn({ league, matches }: LeagueColumnProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">{league}</h2>
      <div className="space-y-3">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-700 p-3 rounded">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 text-center">
                <img
                  src={match.opponents[0]?.opponent.image_url || "/default-team.png"}
                  className="h-12 w-12 mx-auto mb-1 rounded-full"
                  alt={match.opponents[0]?.opponent.name}
                />
                <span className="text-sm text-gray-200">{match.opponents[0]?.opponent.name}</span>
              </div>

              <div className="text-gray-300 text-sm">vs</div>

              <div className="flex-1 text-center">
                <img
                  src={match.opponents[1]?.opponent.image_url || "/default-team.png"}
                  className="h-12 w-12 mx-auto mb-1 rounded-full"
                  alt={match.opponents[1]?.opponent.name}
                />
                <span className="text-sm text-gray-200">{match.opponents[1]?.opponent.name}</span>
              </div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-200">
              {new Date(match.scheduled_at).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="text-gray-200 text-center">No upcoming matches</p>
        )}
      </div>
    </div>
  );
}