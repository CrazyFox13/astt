import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NegativePage } from './negative.page';
import {UsersModule} from "../../../../../modules/users/users.module";

const routes: Routes = [
  {
    path: '',
    component: NegativePage
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
  declarations: [NegativePage]
})
export class NegativePageModule {}
