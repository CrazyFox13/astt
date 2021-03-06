import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectCityPage } from './select-city.page';
import {PipesModule} from "../../../modules/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: SelectCityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [SelectCityPage]
})
export class SelectCityPageModule {}
