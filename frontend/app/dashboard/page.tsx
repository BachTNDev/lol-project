import DashboardButton from "@/components/DashboardButton";
import { CalendarIcon, BarChartIcon, UsersIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardButton
          text="Upcoming Matches"
          href="/dashboard/upcoming-matches"
          icon={<CalendarIcon className="w-5 h-5" />}
        />
        <DashboardButton
          text="Predictions"
          href="/dashboard/predictions"
          icon={<BarChartIcon className="w-5 h-5" />}
          className="bg-secondary hover:bg-secondary/90"
        />
        <DashboardButton
          text="Fantasy Teams"
          href="/dashboard/fantasy-teams"
          icon={<UsersIcon className="w-5 h-5" />}
          className="bg-accent hover:bg-accent/90"
        />
      </div>
    </main>
  );
}