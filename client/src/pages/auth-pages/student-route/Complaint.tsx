import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { toastTrigger } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../../../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import FormInput from "../../../components/reusables/form-input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { ComplaintFormValues, complaintSchema } from "../../../schemas/complaint";

const ComplaintPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      description: "",
      category: undefined,
      feedback: "",
    },
  });

  const onSubmit = async (data: ComplaintFormValues) => {
    try {
      const response = await fetch(`/api/complaints/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toastTrigger("Compaint Registered", "Your complaint has been registered.", "success");
        navigate("/dashboard/complaints");
      } else {
        toastTrigger("Error","Failed to submit complaint. Please try again.", "error");
      }
    } catch (error) {
      toastTrigger("Error","Failed to submit complaint. Please try again.", "error");
    }
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
              onClick={() => navigate(-1)}
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