import {Sensor} from "./sensor";

export interface Room {
  name: string
  sensors: Map<string, Sensor>
}
