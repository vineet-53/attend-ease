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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const StudentPage = () => {
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
    },
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setSubmitted(true);
  }

  return (
    <div className="w-full min-h-[calc(100vh-1rem)]">
      <h1 className="pt-10 text-2xl font-mono">Attendance Form</h1>
      {!submitted && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 my-10 w-[60%] "
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

export default StudentPage;
