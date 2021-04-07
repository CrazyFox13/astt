import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResponsesPage } from './responses.page';
import {TasksModule} from "../../../modules/tasks/tasks.module";

const routes: Routes = [
  {
    path: '',
    component: ResponsesPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TasksModule
    ],
  declarations: [ResponsesPage]
})
export class ResponsesPageModule {}
