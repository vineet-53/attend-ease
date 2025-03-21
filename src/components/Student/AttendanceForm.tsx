"use client";
import SubmitModal from "@/components/SubmitModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AttendanceForm = ({ fingerprint }: { fingerprint: string | null }) => {
  const formSchema = z.object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    university_roll: z
      .string({
        required_error: "university roll is required",
        invalid_type_error: "roll must be string",
      })
      .length(7),
    official_mail: z
      .string({
        required_error: "mail is missing",
        invalid_type_error: "email must be string",
      })
      .endsWith("gehu.ac.in", { message: "only gehu.*.* is allowed" }),

    phone_no: z
      .string({
        required_error: "phone no is missing",
      })
      .length(10, { message: "phone no should be 10 digits" }),
    room_id: z
      .string({
        required_error: "room id missing",
        invalid_type_error: "room id must be string",
      })
      .min(2),
    class_code: z
      .string({
        required_error: "class code missing",
        invalid_type_error: "class code must be string",
      })
      .min(2)
      .max(50),
    section: z
      .string({
        required_error: "section missing",
        invalid_type_error: "section must be string",
      })
      .min(1),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      university_roll: "",
      official_mail: "",
      phone_no: "",
      room_id: "",
      class_code: "",
      section: "",
    },
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [location, setLocation] = useState<null | { [key: string]: string }>(
    null,
  );

  function notify() {
    toast("Form is been submitted succesfully", {
      description: new Date().toLocaleString(),
    });
  }

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((coords) => {
      setLocation({
        lat: String(coords.coords.latitude),
        long: String(coords.coords.longitude),
        altitude: String(coords.coords.altitude),
      });
    });
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location) {
      toast.error("provide location access.");
      if (navigator.geolocation) {
        getUserLocation();
      }
      return;
    }
    if (!fingerprint || !fingerprint.length) {
      window.location.reload();
      return;
    }
    (async () => {
      const toastId = toast.loading("submitting Attendance...");
      try {
        const response = await axios.post("/api/attendance", {
          formData: {
            ...values,
            ...location,
            fingerprint,
          },
        });

        if (!response.data?.success) {
          throw new Error(response.data?.message || "error creating form");
        }

        console.log(response);
        setSubmitted(true);
        notify();
      } catch (err: any) {
        toast.error(err?.message || err);
        console.log(err?.message || err);
      } finally {
        toast.dismiss(toastId);
      }
    })();
  }

  return (
    <div className="w-full min-h-[calc(100vh-1rem)]">
      <h1 className="pt-10 text-2xl font-mono">Attendance Form</h1>
      {!submitted && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 font-sans lg:space-y-6 my-10 lg:w-[60%] w-full  "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university_roll"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Roll</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter university roll" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="official_mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="*.gehu.ac.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone no</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone no" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="room_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section" {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
      {submitted && <SubmitModal />}
    </div>
  );
};

export default AttendanceForm;
