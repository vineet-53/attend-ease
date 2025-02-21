"use client";
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  faculty_name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "must be string",
    })
    .min(2, {
      message: "name must be at least 2 characters.",
    }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "must be string",
    })
    .endsWith("gmail.com", { message: "must be gmail.com extension" }),
  subject_code: z
    .string({ required_error: "class is required" })
    .min(2, { message: "atleast 2 characters." }),
  class_code: z
    .string({
      required_error: "classcode is required",
      invalid_type_error: "must be string",
    })
    .min(1, { message: "min 1 length" }),
  batch: z
    .string({
      required_error: "batch is required",
      invalid_type_error: "must be string",
    })
    .min(2, { message: "atleast 2 characters" }),
});

const CreateRoomForm = ({ setOpen }: { setOpen: (state: boolean) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faculty_name: "",
      email: "",
      subject_code: "",
      batch: "",
      class_code: "",
    },
  });
  function notify(status: string) {
    if (status == "success") {
      toast("Created Room", {
        description: new Date().toLocaleString(),
      });
    } else {
      toast("Failed Creating Room Try again.", {
        description: new Date().toLocaleString(),
      });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // if form get submit the close the form
    setOpen(false);
    notify("success");
  }
  return (
    <div className="font-sans">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="faculty_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter instructor name" {...field} />
                </FormControl>
                <FormDescription>
                  This field is for instructor name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter instructor email" {...field} />
                </FormControl>
                <FormDescription>This is for instructor email </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subject code" {...field} />
                </FormControl>
                <FormDescription>
                  This field is for subject code ex. TCS-101
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter batch" {...field} />
                </FormControl>
                <FormDescription>
                  This field is for batch name ex. BTECH CSE 2024
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter class code" {...field} />
                </FormControl>
                <FormDescription>
                  This field is for class code ex. secret_key
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoomForm;
