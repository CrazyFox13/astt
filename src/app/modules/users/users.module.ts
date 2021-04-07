import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {UsersItemsListComponent} from "./components/users-items-list/users-items-list.component";
import {UserRatingComponent} from "./components/user-rating/user-rating.component";
import {UserPublicInfoComponent} from "./components/user-public-info/user-public-info.component";
import {UserSpecListComponent} from "./components/user-spec-list/user-spec-list.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";


@NgModule({
    declarations: [UsersItemsListComponent, UserRatingComponent, UserPublicInfoComponent, UserSpecListComponent, ReviewsComponent],
    exports: [UsersItemsListComponent, UserRatingComponent, UserPublicInfoComponent, UserSpecListComponent, ReviewsComponent],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class UsersModule {
}
