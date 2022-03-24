import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomListComponent} from "./components/room-list/room-list.component";

const routes: Routes = [
  {
    path: 'home',
    component: RoomListComponent
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
