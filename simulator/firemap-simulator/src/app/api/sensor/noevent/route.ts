import { db } from "@/server/db";

//for the view and python simulator
//get all active sensors
export async function GET() {
  const sensorsWitoutEvents = await db.sensor.findMany({
    where: {
      intensity: 0,
      events: {
        some: {
          event: {
            is_over: true,
          },
        },
      },
    },
    include: {
      events: {
        include: {
          event: true,
        },
      },
    },
  });

  const sensorsWithoutEvents = await db.sensor.findMany({
    where: {
      intensity: 0,
      events: {
        none: {},
      },
    },
  });

  const allSensors = [...sensorsWitoutEvents, ...sensorsWithoutEvents];

  return Response.json(allSensors);
}
