"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateRoomForm from "./CreateRoomForm";
import SubHeading from "../SubHeading";
import { useFormContext } from "@/contexts/room-form-provider";

const Cards = () => {
  //TODO: fix this using useformcontextprovider
  const { open, setOpen, setFormDefaultValues, setRoomId } = useFormContext();
  return (
    <div>
      <SubHeading
        text={"Room"}
        className={"my-4 ml-1 text-2xl text-white font-bold"}
      />

      <Card className="font-sans sm:w-[90%] md:w-[80%] lg:w-[600px]">
        <CardHeader>
          <CardTitle>Create Room</CardTitle>
          <CardDescription>Create room to take the attendance.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpen(true);
                  setRoomId(null);
                  setFormDefaultValues({
                    batch: "",
                    class_code: "",
                    email: "",
                    faculty_name: "",
                    subject_code: "",
                  });
                }}
                variant="default"
                className="ml-auto"
              >
                Create Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Room Form</DialogTitle>
                <CreateRoomForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
