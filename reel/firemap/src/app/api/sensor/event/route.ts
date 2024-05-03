import { db } from "@/server/db";

//for the view
//get all active sensors
export async function GET() {
  const res = await db.sensor.findMany({
    where: {
      intensity: {
        not: 0,
      },
      events: {
        some: {
          event: {
            is_over: false,
          },
        },
      },
    },
  });
  return Response.json(res);
}

//for java emergency manager
//add a new sensor for one event
export async function PUT(request: Request) {
  const res = await request.json();
  const sensor = res.sensor;
  const oneSensor = await db.sensor.update({
    where: {
      id: sensor.id,
    },
    data: {
      events: {
        create: [{ event: { connect: { id: sensor.event_id } } }],
      },
    },
    include: {
      events: true,
    },
  });
  return Response.json(oneSensor);
}
