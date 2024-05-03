import { db } from "@/server/db";

//for the view
//get all active sensors
export async function GET() {
  const res = await db.sensor.findMany({
    where: {
      intensity: {
        not: 0,
      },
    },
  });
  return Response.json(res);
}
