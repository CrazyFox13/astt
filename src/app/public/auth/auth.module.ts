import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SkeletonsModule
    ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
