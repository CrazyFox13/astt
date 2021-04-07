import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityFilterPipe } from './city-filter.pipe';


@NgModule({
  declarations: [CityFilterPipe],
  exports: [
    CityFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
