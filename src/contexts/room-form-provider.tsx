import { TFormValues } from "@/types/Faculty-types";
import { createContext, useContext, useState, ReactNode } from "react";

type TRoomFormContext = {
  open: boolean;
  setOpen: (s: boolean) => void;
  setFormDefaultValues: (s: TFormValues) => void;
  defaultValues: TFormValues;
  edit: boolean;
  setEdit: (s: boolean) => void;
  roomId: string | null;
  setRoomId: (s: string | null) => void;
};

const RoomFormContext = createContext<TRoomFormContext>({
  open: false,
  setOpen: () => {},
  setFormDefaultValues: () => {},
  defaultValues: {
    faculty_name: "",
    email: "",
    subject_code: "",
    batch: "",
    class_code: "",
  },
  edit: false,
  setEdit: () => {},
  roomId: null,
  setRoomId: () => {},
});

export const RoomFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const [roomId, setRoomId] = useState<string | null>(null);

  const [defaultValues, setDefaultValues] = useState<TFormValues>({
    faculty_name: "",
    email: "",
    subject_code: "",
    batch: "",
    class_code: "",
  });

  const setFormDefaultValues = (values: TFormValues) => {
    setDefaultValues(values);
  };

  return (
    <RoomFormContext.Provider
      value={{
        open,
        edit,
        setEdit,
        setOpen,
        defaultValues,
        setFormDefaultValues,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </RoomFormContext.Provider>
  );
};

export const useFormContext = () => useContext(RoomFormContext);
