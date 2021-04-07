import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IExecutorPage } from './i-executor.page';
import {SkeletonsModule} from "../../../modules/skeletons/skeletons.module";

const routes: Routes = [
  {
    path: '',
    component: IExecutorPage
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
  declarations: [IExecutorPage]
})
export class IExecutorPageModule {}
