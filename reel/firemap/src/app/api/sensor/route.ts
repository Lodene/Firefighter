import { db } from "@/server/db";

//for python gateway
//get one sensor
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 });
  //convert id in to number
  const idNumber = Number(id);
  const sensor = await db.sensor.findUnique({
    where: { id: idNumber },
    include: {
      events: {
        where: {
          event: { is_over: false },
        },
        include: {
          event: true,
        },
      },
    },
  });
  return Response.json(sensor);
}

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
