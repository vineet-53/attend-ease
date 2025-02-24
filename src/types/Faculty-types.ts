export type TRoom = {
  roomid: string;
  subjectCode: string;
  status: "OPEN" | "CLOSED";
  batch: string;
  classCode: string;
  facultyName: string;
  facultyEmail: string;
};

export type TFormValues = {
  faculty_name: string;
  email: string;
  subject_code: string;
  batch: string;
  class_code: string;
};
