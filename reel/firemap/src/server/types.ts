export type Event = {
  id: number;
  is_over: boolean;
  sensors?: Sensor[];
  created_at: Date;
};

export type Sensor = {
  id: number;
  intensity: number;
  latitude: number;
  longitude: number;
  events?: Event[];
  created_at: Date;
};

export type Base = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  created_at: Date;
};

export type Vehicle = {
  id: number;
  is_busy: boolean;
  latitude: number;
  longitude: number;
  events?: Event[];
  created_at: Date;
};

export type EventVehicle = {
  id: number;
  event_id: number;
  vehicle_id: number;
  on_site: boolean;
  created_at: Date;
};
