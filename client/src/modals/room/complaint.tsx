import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComplaintFormValues, complaintSchema } from "../../schemas/complaint";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import FormInput from "../../components/reusables/form-input";
import { Button } from "../../components/ui/button";
import { ModalType } from "../../types/modal.types";
import { useComplaintMutation } from "../../api/mutations/complaint.mutation";

const ComplaintPage = ({initiatorName}: ModalType<"COMPLAINT">) => {  
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      description: "",
      category: undefined,
      feedback: "",
    },
  });
  const {mutate}= useComplaintMutation({initiatorName:initiatorName!});
  const onSubmit = async (data: ComplaintFormValues) => {
    mutate(data)
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Register a Complaint</CardTitle>
        <CardDescription>
          Submit details about issues with your room for prompt resolution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  Category <span className="text-red-600 text-xs">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1">
            <FormLabel className="text-sm">
              Description <span className="text-red-600 text-xs">*</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormInput
            label="Feedback"
            name="feedback"
            form={form}
            type="text"
            placeholder="Any additional feedback"
            required={true}
          />

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit">Submit Complaint</Button>
          </div>
        </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ComplaintPage;