"use client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const MyPage = () => {
  const [sensors, setSensors] = useState([]);
  const [sensorsWithoutEvent, setSensorsWithoutEvent] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorsWithEvents = await axios.get("/api/sensor/active");
        setSensors(sensorsWithEvents.data);
        const sensorsWithEventsWithoutEvents = await axios.get(
          "/api/sensor/noevent"
        );
        setSensorsWithoutEvent(sensorsWithEventsWithoutEvents.data);
        revalidatePath("/");
      } catch (error) {
        console.error("Erreur lors de la requête à votre API", error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [reloadData]);
  const data = { sensors, sensorsWithoutEvent };

  return (
    <div>
      <MapComponent data={data} reloadData={setReloadData} />
    </div>
  );
};

export default MyPage;
