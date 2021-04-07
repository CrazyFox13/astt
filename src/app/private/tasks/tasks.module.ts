import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SkeletonsModule
    ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
