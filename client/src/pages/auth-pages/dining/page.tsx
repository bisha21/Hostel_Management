// src/components/dining/DiningScheduleAdmin.tsx
import React, { useEffect, useState } from 'react';


import { PlusCircle, Trash2, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { DayOfWeek, MealType, WeeklySchedule } from '../../../types/response.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { toastTrigger } from '../../../lib/utils';
import { useFetchWeeklySchedule } from '../../../api/queries/dining.query';
import { useCreateMealMutation, useDeleteMealMutation, useUpdateMealMutation } from '../../../api/mutations/dining.mutation';

interface MealFormData {
    day: DayOfWeek;
    mealType: MealType;
    items: string[];
    startTime: string;
    endTime: string;
}

const DiningScheduleAdmin: React.FC = () => {
    const [activeDay, setActiveDay] = useState<DayOfWeek>("monday");
    const [activeMeal, setActiveMeal] = useState<MealType | null>(null);
    const [mealItems, setMealItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);

    const { data: schedule, isLoading } = useFetchWeeklySchedule();
    const createMealMutation = useCreateMealMutation();
    const updateMealMutation = useUpdateMealMutation();
    const deleteMealMutation = useDeleteMealMutation();
    const days: DayOfWeek[] = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ];
    const dayNames = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
    };
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'snacks', 'dinner'];
    const defaultMealTimes = {
        breakfast: { start: '07:30', end: '09:00' },
        lunch: { start: '12:00', end: '14:00' },
        snacks: { start: '16:30', end: '17:30' },
        dinner: { start: '19:00', end: '21:00' }
    };
    const mealNames = {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        snacks: 'Snacks',
        dinner: 'Dinner'
    };

    const form = useForm<MealFormData>({
        defaultValues: {
            day: "monday",
            mealType: "breakfast",
            items: [],
            startTime: "07:30",
            endTime: "09:00",
        },
    });

    const handleEditMeal = (day: DayOfWeek, mealType: MealType) => {
        const meal = schedule?.[day]?.[mealType];

        form.reset({
            day,
            mealType,
            items: meal?.items || [],
            startTime: meal?.startTime || defaultMealTimes[mealType].start,
            endTime: meal?.endTime || defaultMealTimes[mealType].end,
        });

        setMealItems(meal?.items || []);
        setActiveMeal(mealType);
        setActiveDay(day);
        setEditMode(!!meal);
    };

    const handleAddNewMeal = (day: DayOfWeek, mealType: MealType) => {
        form.reset({
            day,
            mealType,
            items: [],
            startTime: defaultMealTimes[mealType].start,
            endTime: defaultMealTimes[mealType].end,
        });

        setMealItems([]);
        setActiveMeal(mealType);
        setActiveDay(day);
        setEditMode(false);
    };

    const handleAddItem = () => {
        if (newItem.trim()) {
            setMealItems([...mealItems, newItem.trim()]);
            setNewItem("");
        }
    };

    const handleRemoveItem = (index: number) => {
        setMealItems((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: MealFormData) => {
        if (mealItems.length === 0) {
            toastTrigger("Error", "Please add at least one menu item", "error");
            return;
        }

        const mealData = { ...data, items: mealItems };

        try {
            if (editMode) {
                await updateMealMutation.mutateAsync({ day: data.day, mealType: data.mealType, mealData });
                toastTrigger("Success", `Updated ${mealNames[data.mealType]} for ${dayNames[data.day]}`);
            } else {
                await createMealMutation.mutateAsync(mealData);
                toastTrigger("Success", `Added ${mealNames[data.mealType]} for ${dayNames[data.day]}`);
            }

            setActiveMeal(null);
        } catch (err) {
            toastTrigger("Error", `Failed to ${editMode ? "update" : "create"} meal`, "error");
        }
    };

    const handleDeleteMeal = async () => {
        const { day, mealType } = form.getValues();

        try {
            await deleteMealMutation.mutateAsync({ day, mealType });
            toastTrigger("Deleted", `Removed ${mealNames[mealType]} for ${dayNames[day]}`, "error");
            setActiveMeal(null);
        } catch (err) {
            toastTrigger("Error", "Failed to delete meal", "error");
        }
    };

    return (
        <div className="w-full">
            <CardHeader className='px-0'>
                <CardTitle className="text-2xl font-bold">Manage Dining Schedule</CardTitle>
                <CardDescription>
                    Add, edit or remove meals for each day of the week
                </CardDescription>
            </CardHeader>
            <CardContent className='px-0'>
                <Tabs defaultValue={activeDay} value={activeDay} onValueChange={(value) => setActiveDay(value as DayOfWeek)}>
                    <TabsList className="grid grid-cols-7 mb-4">
                        {days.map(day => (
                            <TabsTrigger key={day} value={day} className="text-sm">
                                {dayNames[day].substring(0, 3)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {days.map(day => (
                        <TabsContent key={day} value={day} className="mt-0 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">{dayNames[day]}</h3>
                            </div>

                            {/* Meal selection grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {mealTypes.map(mealType => {
                                    const meal = schedule?.[day]?.[mealType];
                                    const isActive = activeMeal === mealType && activeDay === day;

                                    return (
                                        <Card key={mealType} className={`border ${isActive ? 'border-primary' : ''}`}>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">{mealNames[mealType]}</CardTitle>
                                                {meal && (
                                                    <CardDescription>
                                                        {meal.startTime.substring(0, 5)} - {meal.endTime.substring(0, 5)}
                                                    </CardDescription>
                                                )}
                                            </CardHeader>
                                            <CardContent className="pb-4">
                                                {meal ? (
                                                    <>
                                                        <div className="mb-2 text-sm text-muted-foreground">
                                                            {meal.items.length} items
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full"
                                                            onClick={() => handleEditMeal(day, mealType)}
                                                        >
                                                            Edit Menu
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={() => handleAddNewMeal(day, mealType)}
                                                    >
                                                        <PlusCircle className="mr-2 h-4 w-4" />
                                                        Add Menu
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Meal editing form */}
                            {activeMeal && activeDay === day && (
                                <Card className="mt-6 border-dashed">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-lg">
                                                {editMode ? 'Edit' : 'Add'} {mealNames[activeMeal]} for {dayNames[day]}
                                            </CardTitle>
                                            <Button variant="ghost" size="icon" onClick={() => setActiveMeal(null)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="startTime"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Start Time</FormLabel>
                                                                <FormControl>
                                                                    <Input type="time" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="endTime"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>End Time</FormLabel>
                                                                <FormControl>
                                                                    <Input type="time" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div>
                                                    <FormLabel>Menu Items</FormLabel>
                                                    <div className="flex mt-2 mb-3">
                                                        <Input
                                                            value={newItem}
                                                            onChange={(e) => setNewItem(e.target.value)}
                                                            placeholder="Add a menu item"
                                                            className="mr-2"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleAddItem();
                                                                }
                                                            }}
                                                        />
                                                        <Button type="button" onClick={handleAddItem}>
                                                            Add
                                                        </Button>
                                                    </div>

                                                    {mealItems.length > 0 ? (
                                                        <div className="border rounded-md">
                                                            <ul className="divide-y">
                                                                {mealItems.map((item, index) => (
                                                                    <li key={index} className="flex items-center justify-between p-3">
                                                                        <span>{item}</span>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => handleRemoveItem(index)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                                        </Button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center p-4 border rounded-md text-muted-foreground">
                                                            No items added yet
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex justify-between pt-2">
                                                    {editMode && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            onClick={handleDeleteMeal}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Meal
                                                        </Button>
                                                    )}

                                                    <Button type="submit" className={editMode ? "ml-auto" : ""}>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        {editMode ? 'Update' : 'Save'} Menu
                                                    </Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </div>
    );
};

export default DiningScheduleAdmin;