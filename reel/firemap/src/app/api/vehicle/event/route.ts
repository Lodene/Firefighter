import { db } from "@/server/db";
import { calculateRouteProperties } from "@/utils/itinerary";

//for java emergency manager
//assigning vehicles to events
export async function POST(request: Request) {
  const res = await request.json();
  const vehicle = res.vehicle;

  const updatedVehicle = await db.vehicle.update({
    where: {
      id: vehicle.id,
    },
    data: {
      is_busy: true,
      events: {
        create: [{ event: { connect: { id: vehicle.eventId } } }],
      },
    },
    include: {
      events: {
        include: {
          event: {
            include: {
              sensors: {
                include: {
                  sensor: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json(updatedVehicle);
}

//for simulator
//get all vehicles and their itineraries

export async function GET() {
  const vehicles = await db.vehicle.findMany({
    where: {
      is_busy: true,
      events: {
        some: {
          event: {
            is_over: false,
          },
          on_site: false,
        },
      },
    },
    include: {
      events: {
        include: {
          event: {
            include: {
              sensors: {
                include: {
                  sensor: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const operationProperties = await Promise.all(
    vehicles.map(async (vehicle) => {
      const maxIntensitySensor = (
        vehicle.events[0]?.event?.sensors || []
      ).reduce(
        (maxSensor: any, oneSensor: any) =>
          oneSensor.sensor.intensity >
          (maxSensor?.intensity || Number.NEGATIVE_INFINITY)
            ? oneSensor.sensor
            : maxSensor,
        null
      );

      const position = `${vehicle.longitude},${vehicle.latitude}`;
      const end = `${maxIntensitySensor.longitude},${maxIntensitySensor.latitude}`;
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

//for simulator
//inform that a vehicle has finished its intervention
export async function PUT(request: Request) {
  const params = await request.json();
  if (params.id == null && params.event_id == null) return;
  const updatedVehicle = await db.vehicle.update({
    where: {
      id: params.id,
    },
    data: {
      is_busy: false,
    },
  });
  return Response.json(updatedVehicle);
}
