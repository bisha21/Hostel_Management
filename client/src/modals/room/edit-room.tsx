import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import FormInput from "../../components/reusables/form-input";
import useModalContext from "../../hooks/useModalContext";
import { roomValidationSchema, TRoomValidationType } from "../../schemas/room";
import { useEditRoomMutation } from "../../api/mutations/room.mutation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ROOM_STATUS, ROOM_TYPE } from "../../constants";
import { ModalType } from "../../types/modal.types";

export default function EditRoom({initiatorName, data}:ModalType<"EDIT_ROOM">) {
    const { closeModal } = useModalContext();
    
    const form = useForm({
        resolver: zodResolver(roomValidationSchema),
        mode: "onChange",
        defaultValues: {
            RoomNumber: data?.RoomNumber || "",
            Capacity: data?.Capacity || 0,
            Status: data?.Status || "Available",
            Type: data?.Type || "Single",
            Price: data?.Price || 0,
            Description: data?.Description || "",
            FloorNumber: data?.FloorNumber || 1,
        },
    });

    const { mutate } = useEditRoomMutation({initiatorName: initiatorName!});

    const onSubmit = (data:TRoomValidationType) => {
        mutate(data, {
            onSuccess: () => {
                closeModal("EDIT_ROOM");
            },
        });
    };

    return (
        <div>
            <p className="font-semibold">Edit Room</p>
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
                                Discard
                            </Button>
                            <Button className="w-full mt-4" disabled={!form.formState.isValid || !form.formState.isDirty}>Edit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
