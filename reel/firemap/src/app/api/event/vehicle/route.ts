import { db } from "@/server/db";
import { EventVehicle } from "@/server/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("eventId");
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 });

  const idNumber = Number(id);
  const event = await db.event.findUnique({
    where: { id: idNumber, is_over: false },
    include: {
      vehicles: true,
    },
  });

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  const onSiteVehiclesCount = event.vehicles.filter(
    (vehicle: EventVehicle) => vehicle.on_site
  ).length;

  return Response.json(onSiteVehiclesCount);
}
