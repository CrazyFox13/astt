import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';
import {UsersModule} from "../../modules/users/users.module";
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UsersModule,
        SkeletonsModule
    ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
