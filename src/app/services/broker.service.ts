import { Injectable } from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Floor} from "../model/floor";
import {Room} from "../model/room";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private floors: Map<string, Floor> = new Map<string, Floor>()
  private floorSubject = new Subject<Map<string, Floor>>()

  constructor(private mqtt: MqttService) { }

  subscribeToEverything() {
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
      if (!room) {
        floor.rooms.set(roomString, {name: roomString})
        this.evaluatePayload(payload)
      }
    } else {
      this.floors.set(floorString, {name: floorString, rooms: new Map<string, Room>()})
      this.evaluatePayload(payload)
    }

    this.floorSubject.next(this.floors)
  }

  get floorObservable(): Observable<Map<string, Floor>> {
    return this.floorSubject
  }
}
