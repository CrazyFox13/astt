import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MakePage } from './make.page';
import {SkeletonsModule} from "../../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: MakePage
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
  declarations: [MakePage]
})
export class MakePageModule {}
