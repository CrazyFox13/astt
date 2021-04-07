import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PortfolioPage } from './portfolio.page';
import {UsersModule} from "../../../../modules/users/users.module";
import {NgxGalleryModule} from "ngx-gallery";

const routes: Routes = [
  {
    path: '',
    component: PortfolioPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UsersModule,
        NgxGalleryModule
    ],
  declarations: [PortfolioPage]
})
export class PortfolioPageModule {}
