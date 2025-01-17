import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import FormInput from "../../components/reusables/form-input";
import useModalContext from "../../hooks/useModalContext";
import { roomValidationSchema } from "../../schemas/room";
import { useAddRoomMutation } from "../../api/mutations/room.mutation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ROOM_STATUS, ROOM_TYPE } from "../../constants";

export default function AddRoom() {
    const { closeModal } = useModalContext();
    const form = useForm({
        resolver: zodResolver(roomValidationSchema),
        mode: "onChange",
        values: {
            RoomNumber: "",
            Capacity: 0,
            Status: "Available",
            Type: "Single",
            Price: 0,
            Description: "",
            FloorNumber: 1,
        },
    });

    const { mutate } = useAddRoomMutation();

    const onSubmit = (data: any) => {
        mutate(data, {
            onSuccess: () => {
                form.reset();
                closeModal("ADD_ROOM");
            },
        });
    };

    return (
        <div>
            <p className="font-semibold">Add Room</p>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-3"
                    >
                        <FormInput
                            label="Room Number"
                            form={form}
                            name="RoomNumber"
                            type="text"
                            placeholder="Enter Room Number"
                            required
                        />

                        <FormInput
                            label="Capacity"
                            form={form}
                            name="Capacity"
                            type="number"
                            placeholder="Enter Capacity"
                            required
                        />

                        <FormInput
                            label="Status"
                            form={form}
                            name="Status"
                            type="select"
                            render={(field) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    value={field.value?.toString()}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ROOM_STATUS.map((status) => (
                                            <SelectItem
                                                key={status.id}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            required
                        />

                        <FormInput
                            label="Type"
                            form={form}
                            name="Type"
                            type="select"
                            render={(field) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    value={field.value?.toString()}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ROOM_TYPE.map((status) => (
                                            <SelectItem
                                                key={status.id}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            required
                        />

                        <FormInput
                            label="Price"
                            form={form}
                            name="Price"
                            type="number"
                            placeholder="Enter Price"
                            required
                        />

                        <FormInput
                            label="Description"
                            form={form}
                            name="Description"
                            type="text"
                            placeholder="Enter Description (Optional)"
                        />

                        <FormInput
                            label="Floor Number"
                            form={form}
                            name="FloorNumber"
                            type="number"
                            placeholder="Enter Floor Number"
                            required
                        />

                        <div className="flex justify-end gap-3">
                            <Button
                                variant={"outline"}
                                className="w-full mt-4"
                                onClick={() => form.reset()}
                            >
                                Reset
                            </Button>
                            <Button className="w-full mt-4" disabled={!form.formState.isValid}>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
