import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const userRole = user?.publicMetadata.role;

  if (!user) {
    return <RedirectToSignIn />;
  }
  if (userRole == "faculty") {
    return redirect("/faculty");
  }
  if (userRole == "student") {
    return redirect("/student");
  }

  return <></>;
}
