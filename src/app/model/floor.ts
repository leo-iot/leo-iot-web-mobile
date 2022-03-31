import {Room} from "./room";

export interface Floor {
  name: string,
  rooms: Map<string, Room>
}
