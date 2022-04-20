import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

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
    RoomListComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(mqttConfig),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
