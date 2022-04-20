import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../model/room";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BrokerService} from "../../services/broker.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room?: Room;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private broker: BrokerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const floorId = params.get('floorId')
      const roomId = params.get('roomId')

      if (!this.broker.isSubscribedToEverything) {
        this.broker.subscribeToEverything()
      }

      if (roomId && floorId) {
        this.broker.findRoom(floorId, roomId).subscribe(room => {
          this.room = room
          this.loading = false
        })
      }
    })
  }

}
