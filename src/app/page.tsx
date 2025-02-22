import { ACCOUNT_TYPES } from "@/middleware";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const userRole = user?.publicMetadata.role;

  if (!user) {
    return <RedirectToSignIn />;
  }
  if (userRole == ACCOUNT_TYPES.FACULTY) {
    return redirect("/faculty");
  }
  if (userRole == ACCOUNT_TYPES.STUDENT) {
    return redirect("/student");
  }

  return <></>;
}
