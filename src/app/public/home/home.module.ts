import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {TasksModule} from "../../modules/tasks/tasks.module";
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    TasksModule,
    SkeletonsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
