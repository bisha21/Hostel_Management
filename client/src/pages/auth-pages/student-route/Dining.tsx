// src/components/dining/DiningScheduleView.tsx
import React, { useEffect, useState } from "react";
import { DayOfWeek, MealType } from "../../../types/response.types";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { useFetchWeeklySchedule } from "../../../api/queries/dining.query";

const DiningScheduleView: React.FC = () => {
  // const [schedule, setSchedule] = useState<WeeklySchedule | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<DayOfWeek>("monday");
  const {
    data: schedule,
    isLoading: loading,
    error,
  } = useFetchWeeklySchedule();
  const days: DayOfWeek[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const mealTypes: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const mealNames = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    snacks: "Snacks",
    dinner: "Dinner",
  };

  // Get current day for highlighting
  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    // Convert to our day format (0 = Sunday in JS Date, but we want 0 = Monday)
    const dayMapping: Record<number, DayOfWeek> = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };

    setActiveDay(dayMapping[currentDayIndex]);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full bg-slate-100" />
        <Skeleton className="h-64 w-full bg-slate-100" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <p className="text-slate-800">{JSON.stringify(error)}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-slate-50">
      <div className="">
        <div className="min-h-[calc(100vh-200px)] bg-slate-50">
          <Card className="w-full bg-slate-50 border-slate-100 rounded-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Dining Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeDay} className="w-full">
                <TabsList className="grid grid-cols-7 mb-4 bg-slate-100">
                  {days.map((day) => (
                    <TabsTrigger
                      key={day}
                      value={day}
                      className="text-sm data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-600"
                    >
                      {dayNames[day].substring(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {days.map((day) => (
                  <TabsContent key={day} value={day} className="mt-0">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">
                      {dayNames[day]}
                    </h3>

                    <div className="space-y-6">
                      {mealTypes.map((mealType) => {
                        const meal = schedule?.[day]?.[mealType];

                        return (
                          <Card
                            key={mealType}
                            className="border-slate-100 overflow-hidden bg-white"
                          >
                            <div className="bg-slate-100 p-4 flex items-center justify-between">
                              <h4 className="text-lg font-medium text-slate-800">
                                {mealNames[mealType]}
                              </h4>
                              {meal && (
                                <Badge
                                  variant="outline"
                                  className="text-xs text-emerald-600 border-emerald-500"
                                >
                                  {meal.startTime.substring(0, 5)} -{" "}
                                  {meal.endTime.substring(0, 5)}
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              {meal ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {meal.items.map((item, index) => (
                                    <li key={index} className="text-slate-600">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-slate-600 italic">
                                  No menu available
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiningScheduleView;
