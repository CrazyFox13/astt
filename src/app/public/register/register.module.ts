import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import {NgxMaskModule} from "ngx-mask";
import {SkeletonsModule} from "../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxMaskModule,
        SkeletonsModule
    ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
