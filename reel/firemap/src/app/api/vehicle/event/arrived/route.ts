import { db } from "@/server/db";

// for simulator
// inform that vehicle has arrived at destination
export async function PUT(request: Request) {
  const params = await request.json();
  if (params.vehicle_on_event_id == null) return;
  const vehicleOnEvent = await db.vehiclesOnEvents.update({
    where: {
      id: params.vehicle_on_event_id,
    },
    data: {
      on_site: true,
    },
  });
  return Response.json(vehicleOnEvent);
}
