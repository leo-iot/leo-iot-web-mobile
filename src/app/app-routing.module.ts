import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomListComponent} from "./components/room-list/room-list.component";
import {RoomDetailComponent} from "./components/room-detail/room-detail.component";

const routes: Routes = [
  {
    path: 'home',
    component: RoomListComponent
  },
  {
    path: 'room/:floorId/:roomId',
    component: RoomDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
