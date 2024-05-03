import { Sensor } from "@/server/types";
import { Icon, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import CardNewFire from "./CardNewFire";

type MapType = {
  data: {
    sensors?: Sensor[];
    sensorsWithoutEvent?: Sensor[];
  };
  reloadData: (bool: boolean) => void;
};

const Map = ({ data, reloadData }: MapType) => {
  const { sensors, sensorsWithoutEvent } = data;
  const [isInCreationMode, setIsInCreationMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sensorId, setSensorId] = useState(0);
  const [reload, setReload] = useState(false);

  const handleCircleClick = (event: LeafletMouseEvent, sensor: Sensor) => {
    setShowModal(true);
    setSensorId(sensor.id);
  };

  const onCancel = () => {
    setShowModal(false);
    setReload(!reload);
    reloadData(reload);
  };
  return (
    <div className="relative">
      <div>
        <MapContainer
          center={[45.763377, 4.861766]}
          zoom={14}
          style={{ height: "100vh", width: "100vw", zIndex: 1 }}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
          {sensors?.map((sensor) => (
            <Circle
              key={sensor.id}
              center={[sensor.latitude, sensor.longitude]}
              radius={sensor.intensity * 20}
              color={"#FF4901"}
            />
          ))}
          {isInCreationMode &&
            sensorsWithoutEvent?.map((sensor) => (
              <Circle
                key={sensor.id}
                center={[sensor.latitude, sensor.longitude]}
                radius={2}
                color={"black"}
                eventHandlers={{
                  click: (event) => handleCircleClick(event, sensor),
                }}
              />
            ))}
        </MapContainer>
      </div>
      {showModal && <CardNewFire sensorId={sensorId} onCancel={onCancel} />}

      <button
        onClick={() => {
          setIsInCreationMode(!isInCreationMode);
        }}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 rounded-lg text-white bg-orange-600 px-3 py-2 "
      >
        Mode création
      </button>
    </div>
  );
};

export default Map;
