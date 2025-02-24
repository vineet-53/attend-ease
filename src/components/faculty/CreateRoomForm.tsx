"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useFormContext } from "@/contexts/room-form-provider";

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

type Location = {
  lat: number;
  long: number;
  altitude?: number | null;
};

const CreateRoomForm = () => {
  const { edit, setOpen, defaultValues, roomId } = useFormContext();
  const [location, setLocation] = useState<Location | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location) {
      toast.error("Please provide location access");
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition((coords) => {
          setLocation({
            lat: coords.coords.latitude,
            long: coords.coords.longitude,
            altitude: coords.coords.altitude,
          });
        });
      return;
    }
    if (!edit) {
      const toastId = toast.loading("submitting form...");
      try {
        values = {
          ...values,
          ...location,
        };

        let response = await axios
          .post("/api/room/create", {
            room_info: values,
          })
          .then((data) => data.data);

        console.log("logging res after submitting form ", response);

        if (!response.success) {
          throw new Error(response);
        }

        setOpen(false);
        notify("success");
        window.location.reload();
      } catch (err: any) {
        toast.error("Erorr creating form try again...");
        console.log(err?.message || err);
      }
      toast.dismiss(toastId);
    } else {
      // update the form using different query
      const toastId = toast.loading("updating form...");
      console.log("UPDATING FORM", roomId);
      try {
        const response = await axios.put("/api/room/update");
      } catch (err: any) {}
      toast.dismiss(toastId);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((coords) => {
        console.log(coords);
        setLocation({
          lat: coords.coords.latitude,
          long: coords.coords.longitude,
          altitude: coords.coords.altitude,
        });
      });
    }
  }, []);
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
