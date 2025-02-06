import { BookIcon, Briefcase, DollarSign, User } from "lucide-react";
import PageHeader from "../../../components/reusables/page-header";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import CalendarPreview from "./_components/calendar";
import { DailyStats } from "./_components/daily-stats";
import { Component } from "./_components/pie-chart";
import useAuthContext from "../../../hooks/useAuthContext";

export default function Dashboard() {
  const {user} = useAuthContext();
  console.log(user)
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="flex gap-5 flex-col">
      <div className=" max-w-[1000px] flex  gap-6 mx-7">
        <Card className="w-[300px] h-32  px-8 " >
          <CardHeader className="py-2 px-2 flex flex-row items-center gap-7 " >
            <BookIcon/>
            <h3>Booking</h3>
        </CardHeader>
        <CardContent className="text-center font-semibold text-xl text-teal-900 py-4">
          5
        </CardContent>
        </Card>
        <Card className="w-[300px] h-32  px-8 " >
          <CardHeader className="py-2 px-2 flex flex-row items-center gap-7 " >
            <User/>
            <h3>Stundent</h3>
        </CardHeader>
        <CardContent className="text-center font-semibold text-xl text-teal-900 py-4">
          5
        </CardContent>
        </Card>
        <Card className="w-[300px] h-32  px-8 " >
          <CardHeader className="py-2 px-2 flex flex-row items-center gap-7 " >
            <DollarSign/>
            <h3>Revinue</h3>
        </CardHeader>
        <CardContent className="text-center font-semibold text-xl text-teal-900 py-4">
          5
        </CardContent>
        </Card>
        <Card className="w-[300px] h-32  px-8 " >
          <CardHeader className="py-2 px-2 flex flex-row items-center gap-7 " >
            <Briefcase/>
            <h3>Payment</h3>
        </CardHeader>
        <CardContent className="text-center font-semibold text-xl text-teal-900 py-4">
          5
        </CardContent>
        </Card>
      </div>
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
