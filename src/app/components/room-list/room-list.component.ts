import { Component, OnInit } from '@angular/core';
import {MqttService} from "ngx-mqtt";
import {BrokerService} from "../../services/broker.service";
import {Floor} from "../../model/floor";
import {Router} from "@angular/router";
import {Room} from "../../model/room";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  floors: Map<string, Floor> = new Map<string, Floor >()
  searchQuery: string = "";

  constructor(private broker: BrokerService, private router: Router) { }

  ngOnInit(): void {
    this.broker.floorObservable
      .subscribe(floors => {
        this.floors = floors
      })

    this.broker.subscribeToEverything()
  }

  async openDetailView(floor: Floor, roomObject: any) {
    const room = roomObject as Room
    await this.router.navigate([`room/${floor.name}/${room.name}`])
  }
}
