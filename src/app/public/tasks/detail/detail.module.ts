import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import {TasksModule} from "../../../modules/tasks/tasks.module";
import {UsersModule} from "../../../modules/users/users.module";

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TasksModule,
        UsersModule
    ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
