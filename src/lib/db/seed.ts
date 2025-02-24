import { db } from "./db";
import { users } from "./schema/schema";

export default async function main() {
  const user = await db.select().from(users);
  console.log("USER IS : ", user);
  return user;
}
