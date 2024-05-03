import { Base, Sensor, Vehicle } from "@/server/types";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

type MapType = {
  data: {
    sensors?: Sensor[];
    bases: Base[];
    vehicles: Vehicle[];
  };
};

const baseIcon = new Icon({
  iconUrl: "/img/base.png",
  iconSize: [40, 40],
});

const vehicleIcon = new Icon({
  iconUrl: "/img/vehicle.png",
  iconSize: [30, 30],
});

const Map = ({ data }: MapType) => {
  const { sensors, bases, vehicles } = data;
  console.log(sensors);
  const [isSensorsShown, setIsSensorsShown] = React.useState(true);
  const [isVehiclesShown, setIsVehiclesShown] = React.useState(true);
  return (
    <div className="relative">
      <div>
        <MapContainer
          center={[45.763377, 4.861766]}
          zoom={14}
          style={{ height: "100vh", width: "100vw", zIndex: 1 }}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />

          {isVehiclesShown &&
            vehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={[vehicle.latitude, vehicle.longitude]}
                icon={vehicleIcon}
              />
            ))}
          {bases.map((base) => (
            <Marker
              key={base.id}
              position={[base.latitude, base.longitude]}
              icon={baseIcon}
            />
          ))}

          {isSensorsShown &&
            sensors?.map((sensor) => (
              <Circle
                key={sensor.id}
                center={[sensor.latitude, sensor.longitude]}
                radius={sensor.intensity * 20}
                color={"#FF4901"}
              />
            ))}
        </MapContainer>
      </div>
      <button
        onClick={() => setIsSensorsShown(!isSensorsShown)}
        className={`py-2 w-40 justify-center rounded-lg absolute bottom-12 gap-2 items-center left-6 z-50 flex ${
          isSensorsShown ? "bg-red-700" : "bg-green-700"
        }`}
      >
        {isSensorsShown ? <EyeOff size={20} /> : <Eye size={20} />}
        <span>{isSensorsShown ? "Hide Sensors" : "Show Sensors"}</span>
      </button>
      <button
        onClick={() => setIsVehiclesShown(!isVehiclesShown)}
        className={`py-2 w-40 justify-center rounded-lg absolute bottom-24 gap-2 items-center left-6 z-50 flex ${
          isVehiclesShown ? "bg-red-700" : "bg-green-700"
        }`}
      >
        {isVehiclesShown ? <EyeOff size={20} /> : <Eye size={20} />}
        <span>{isVehiclesShown ? "Hide Vehicles" : "Show Vehicles"}</span>
      </button>
    </div>
  );
};

export default Map;
