// Example: frontend/src/pages/dashboard/upcoming.tsx (Pages Router)
import UpcomingMatches from "../../../components/UpcomingMatches";

export default function UpcomingPage() {
  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard - Upcoming Matches</h2>
      <UpcomingMatches />
    </div>
  );
}
