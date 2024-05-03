import { db } from "@/server/db";

// export async function GET() {
//   const sensorsWitoutEvents = await db.sensor.findMany({
//     where: {
//       intensity: {
//         not: 0,
//       },
//       events: {
//         every: {
//           event: {
//             is_over: true,
//           },
//         },
//       },
//     },
//     include: {
//       events: {
//         include: {
//           event: true,
//         },
//       },
//     },
//   });

//   const sensorsWithoutEvents = await db.sensor.findMany({
//     where: {
//       intensity: {
//         not: 0,
//       },
//       events: {
//         none: {},
//       },
//     },
//   });

//   const allSensors = [...sensorsWitoutEvents, ...sensorsWithoutEvents];

//   return Response.json(allSensors);
// }

export async function GET() {
  const sensors = await db.sensor.findMany({
    where: {
      OR: [
        {
          intensity: {
            not: 0,
          },
          events: {
            some: {
              event: {
                is_over: true,
              },
            },
          },
        },
        {
          intensity: {
            not: 0,
          },
          events: {
            none: {},
          },
        },
      ],
    },
    include: {
      events: {
        include: {
          event: true,
        },
      },
    },
  });

  return Response.json(sensors);
}
