import PageHeader from "../../../components/reusables/page-header";
import CalendarPreview from "./_components/calendar";
import { DailyStats } from "./_components/daily-stats";
import { Component } from "./_components/pie-chart";

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div>
        <div className="flex gap-4">
          <DailyStats />
          <CalendarPreview />
          <Component />
        </div>
        <div className="mt-4">
        </div>
      </div>
    </div>
  )
}
