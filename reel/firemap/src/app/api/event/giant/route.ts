import { db } from "@/server/db";

export async function GET() {
  const res = await db.event.findMany({
    where: {
      is_over: false,
      sensors: {
        some: {
          sensor: {
            intensity: {
              gt: 4,
            },
          },
        },
      },
    },
    include: {
      sensors: {
        include: {
          sensor: true,
        },
      },
      vehicles: {
        include: {
          vehicle: true,
        },
      },
    },
  });
  return Response.json(res);
}
