import { Injectable } from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Floor} from "../model/floor";
import {Room} from "../model/room";
import {map, Observable, Subject} from "rxjs";
import {Sensor} from "../model/sensor";

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private floors: Map<string, Floor> = new Map<string, Floor>()
  private floorSubject = new Subject<Map<string, Floor>>()
  public isSubscribedToEverything = false

  constructor(private mqtt: MqttService) { }

  subscribeToEverything() {
    this.isSubscribedToEverything = true
    this.mqtt.observeRetained('+/+/+/state')
      .subscribe(payload => {
        this.evaluatePayload(payload)
      })
  }

  evaluatePayload(payload: IMqttMessage) {
    const [floorString, roomString, sensorString, stateString] = payload.topic.split('/')
    const floor = this.floors.get(floorString)
    if (floor) {
      const room = floor.rooms.get(roomString)
      if (room) {
        try {
          room.sensors.set(sensorString, {
            name: sensorString,
            value: JSON.parse(payload.payload.toString())
          })
        } catch (error: any) {
          console.log(error.message)
        }

        this.floorSubject.next(this.floors)
      } else {
        floor.rooms.set(roomString, {name: roomString, sensors: new Map<string, Sensor>()})
        this.evaluatePayload(payload)
      }
    } else {
      this.floors.set(floorString, {name: floorString, rooms: new Map<string, Room>()})
      this.evaluatePayload(payload)
    }
  }

  get floorObservable(): Observable<Map<string, Floor>> {
    return this.floorSubject
  }

  public findRoom(floorId: string, roomId: string): Observable<Room | undefined> {
    return this.floorObservable.pipe(
      map(floors => floors.get(floorId)),
      map(floor => floor ? floor.rooms.get(roomId) : undefined),
    )
  }
}
