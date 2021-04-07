import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskItemsListComponent} from "./components/task-items-list/task-items-list.component";
import {IonicModule} from "@ionic/angular";
import {UsersModule} from "../users/users.module";
import {TaskOffersListComponent} from "./components/task-offers-list/task-offers-list.component";
import {MapComponent} from "./components/map/map.component";
import {StagesComponent} from "./components/stages/stages.component";
import {ImagesComponent} from "./components/images/images.component";
import {FilesComponent} from "./components/files/files.component";
import {PropertiesComponent} from "./components/properties/properties.component";
import {ComplainViewComponent} from "./components/complain-view/complain-view.component";
import {MyOfferComponent} from "./components/my-offer/my-offer.component";
import {NgxGalleryModule} from "ngx-gallery";
import {ComplainComponent} from "./components/complain/complain.component";


@NgModule({
    declarations: [TaskItemsListComponent, TaskOffersListComponent, MapComponent, StagesComponent,
        ImagesComponent, FilesComponent, PropertiesComponent, ComplainViewComponent, MyOfferComponent, ComplainComponent],
    exports: [TaskItemsListComponent, TaskOffersListComponent, MapComponent, StagesComponent,
        ImagesComponent, FilesComponent, PropertiesComponent, ComplainViewComponent, MyOfferComponent, ComplainComponent],
    imports: [
        CommonModule,
        IonicModule,
        UsersModule,
        NgxGalleryModule
    ]
})
export class TasksModule {
}
