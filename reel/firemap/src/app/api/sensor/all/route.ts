import { db } from "@/server/db";

//for python gateway
//get all sensors
export async function GET() {
  const res = await db.sensor.findMany();
  return Response.json(res);
}
