import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompletedPage } from './completed.page';
import {TasksModule} from "../../../../../modules/tasks/tasks.module";
import {UsersModule} from "../../../../../modules/users/users.module";
import {SkeletonsModule} from "../../../../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: CompletedPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TasksModule,
        UsersModule,
        SkeletonsModule
    ],
  declarations: [CompletedPage]
})
export class CompletedPageModule {}
