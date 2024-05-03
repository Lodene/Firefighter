import { db } from "@/server/db";

//for the view
//get all vehicles
export async function GET() {
  const res = await db.vehicle.findMany();
  return Response.json(res);
}

//for simulator
//update vehicle position
export async function PUT(request: Request) {
  const params = await request.json();
  if (params.id == null && params.longitude == null && params.latitude == null)
    return;
  try {
    const updatedVehicle = await db.vehicle.update({
      where: {
        id: params.id,
      },
      data: {
        longitude: params.longitude,
        latitude: params.latitude,
      },
    });
    return Response.json(updatedVehicle);
  } catch {
    return Response.json("error");
  }
}
