import { db } from "@/server/db";

//for python gateway
//update one sensor

export async function PUT(request: Request) {
  const res = await request.json();
  const sensor = res.sensor;
  const oneSensor = await db.sensor.update({
    where: {
      id: sensor.id,
    },
    data: {
      intensity: sensor.intensity,
    },
    include: {
      events: true,
    },
  });
  const { id, intensity, longitude, latitude, created_at, events } = oneSensor;

  return Response.json({
    id,
    intensity,
    longitude,
    latitude,
    created_at,
    events,
  });
}
