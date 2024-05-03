import { db } from "@/server/db";

//for the view
//get all bases
export async function GET() {
  const res = await db.base.findMany();
  return Response.json(res);
}
