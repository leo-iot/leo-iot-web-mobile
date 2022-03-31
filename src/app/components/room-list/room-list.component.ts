import { Component, OnInit } from '@angular/core';
import {MqttService} from "ngx-mqtt";
import {BrokerService} from "../../services/broker.service";
import {Floor} from "../../model/floor";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  floors: Map<string, Floor> = new Map<string, Floor >()

  constructor(private broker: BrokerService) { }

  ngOnInit(): void {
    this.broker.floorObservable
      .subscribe(floors => {
        this.floors = floors
      })

    this.broker.subscribeToEverything()
  }

}
