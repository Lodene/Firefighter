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
