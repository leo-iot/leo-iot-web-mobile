import { Injectable } from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Floor} from "../model/floor";
import {Room} from "../model/room";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {Sensor} from "../model/sensor";

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private floors = new BehaviorSubject<Map<string, Floor>>(new Map<string, Floor>())
  private _isSubscribed = false;

  get isSubscribed() {
    return this._isSubscribed
  }

  constructor(private mqtt: MqttService) { }

  subscribeToEverything() {
    this._isSubscribed = true;
    this.mqtt.observeRetained('+/+/+/state')
      .subscribe(payload => {
        this.evaluatePayload(payload)
      })
  }

  evaluatePayload(payload: IMqttMessage) {
    const [floorString, roomString, sensorString, stateString] = payload.topic.split('/')
    const floors = this.floors.getValue();
    const floor = floors.get(floorString)
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

        this.floors.next(floors)
      } else {
        floor.rooms.set(roomString, {name: roomString, sensors: new Map<string, Sensor>()})
        this.evaluatePayload(payload)
      }
    } else {
      floors.set(floorString, {name: floorString, rooms: new Map<string, Room>()})
      this.evaluatePayload(payload)
    }
  }

  get floorObservable(): Observable<Map<string, Floor>> {
    return this.floors
  }

  public findRoom(floorId: string, roomId: string): Observable<Room | undefined> {
    return this.floorObservable.pipe(
      map(floors => floors.get(floorId)),
      map(floor => floor ? floor.rooms.get(roomId) : undefined),
    )
  }

  get current() {
    return this.floors
  }
}
