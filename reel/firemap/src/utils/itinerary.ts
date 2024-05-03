import axios from "axios";

export async function calculateRouteProperties(start: string, end: string) {
  const params = {
    api_key: "5b3ce3597851110001cf624836756510b58a41c69393de284ed59e2e",
    start,
    end,
  };

  const res = await axios.get(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      params,
    }
  );

  const geometry = res.data.features[0].geometry.coordinates;
  const steps = res.data.features[0].properties.segments[0].steps;
  const routeSteps = steps.map(
    (step: { way_points: number[]; duration: number }) => {
      const coordinates = [];

      for (let i = step.way_points[0]; i <= step.way_points[1]; i++) {
        coordinates.push(geometry[i]);
      }

      return { coordinates, duration: step.duration };
    }
  );
  return routeSteps;
}
