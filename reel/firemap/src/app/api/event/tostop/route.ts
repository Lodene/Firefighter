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
      vehicles: {
        every: {
          on_site: true,
          vehicle: {
            is_busy: true,
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
  console.log(res.length);
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

      await Promise.all(
        event.vehicles.map(async (vehicleData) => {
          await db.vehicle.update({
            where: {
              id: vehicleData.vehicle.id,
            },
            data: {
              is_busy: false,
            },
          });
        })
      );
    })
  );
  return Response.json(updatedEvents.length);
}
