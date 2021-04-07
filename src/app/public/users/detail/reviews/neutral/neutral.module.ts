import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NeutralPage } from './neutral.page';
import {UsersModule} from "../../../../../modules/users/users.module";

const routes: Routes = [
  {
    path: '',
    component: NeutralPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UsersModule
    ],
  declarations: [NeutralPage]
})
export class NeutralPageModule {}
