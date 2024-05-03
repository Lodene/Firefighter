import { db } from "@/server/db";

//for java emergency manager
//get all free vehicles
export async function GET() {
  const res = await db.vehicle.findMany({
    where: {
      is_busy: false,
    },
  });
  return Response.json(res);
}
