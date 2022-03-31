import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";

const mqttConfig: IMqttServiceOptions = {
  username: 'student',
  password: 'passme',
  hostname: 'vm90.htl-leonding.ac.at',
  port: 9001,
  protocol: 'ws',
}


@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(mqttConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
