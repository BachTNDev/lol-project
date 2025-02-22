import UpcomingMatches from '@/components/UpcomingMatches';

export default function UpcomingPage() {
  return (
    <div className="min-h-screen p-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Matches Dashboard</h1>
      <UpcomingMatches />
    </div>
  );
}