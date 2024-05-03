import { db } from "@/server/db";

export async function GET() {
  const res = await db.event.findMany({
    where: {
      is_over: false,
      sensors: {
        every: {
          sensor: {
            intensity: {
              equals: 0,
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
    },
  });
  const updatedEvents = await Promise.all(
    res.map(async (event) => {
      await db.event.update({
        where: {
          id: event.id,
        },
        data: {
          is_over: true,
        },
      });
    })
  );
  return Response.json(updatedEvents.length);
}
