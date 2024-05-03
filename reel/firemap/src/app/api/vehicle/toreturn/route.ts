import { db } from "@/server/db";
import { calculateRouteProperties } from "@/utils/itinerary";

export async function GET() {
  const vehicles = await db.vehicle.findMany({
    where: {
      is_busy: false,
      events: {
        some: {
          event: {
            is_over: true,
          },
          on_site: true,
        },
      },
    },
    include: {
      events: {
        include: {
          event: true,
        },
      },
      base: true,
    },
  });

  const operationProperties = await Promise.all(
    vehicles.map(async (vehicle) => {
      const position = `${vehicle.longitude},${vehicle.latitude}`;
      const end = `${vehicle.base.longitude},${vehicle.base.latitude}`;
      const routeProperties = await calculateRouteProperties(position, end);
      return {
        vehicle_id: vehicle.id,
        routeProperties,
        pivot_event_vehicle_id: vehicle.events[0].id,
      };
    })
  );
  return Response.json(operationProperties);
}
