import { db } from "@/server/db";
import { calculateRouteProperties } from "@/utils/itinerary";

//for java simulator
//return route to base for a vehicle
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 });
  //convert id in to number
  const idNumber = Number(id);
  const vehicle = await db.vehicle.findUnique({
    where: { id: idNumber, is_busy: false },
    include: { base: true },
  });
  if (!vehicle)
    return Response.json({ error: "No vehicle found" }, { status: 404 });
  const vehiclePosition = `${vehicle.longitude},${vehicle.latitude}`;
  const basePosition = `${vehicle.base.longitude},${vehicle.base.latitude}`;
  const routeProperties = await calculateRouteProperties(
    vehiclePosition,
    basePosition
  );
  return Response.json({ vehicle_id: vehicle.id, routeProperties });
}
