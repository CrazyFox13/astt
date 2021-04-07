import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BlackListPage } from './black-list.page';
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";
import {UsersModule} from "../../modules/users/users.module";

const routes: Routes = [
  {
    path: '',
    component: BlackListPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SkeletonsModule,
        UsersModule
    ],
  declarations: [BlackListPage]
})
export class BlackListPageModule {}
