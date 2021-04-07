import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskItemsListSkeletonComponent} from "./components/task-items-list-skeleton/task-items-list-skeleton.component";
import {IonicModule} from "@ionic/angular";
import {UsersItemsListSkeletonComponent} from "./components/users-items-list-skeleton/users-items-list-skeleton.component";
import {MessagesListSkeletonComponent} from "./components/messages-list-skeleton/messages-list-skeleton.component";
import {AggreementComponent} from "./components/aggreement/aggreement.component";


@NgModule({
    declarations: [TaskItemsListSkeletonComponent, UsersItemsListSkeletonComponent, MessagesListSkeletonComponent, AggreementComponent],
    exports: [TaskItemsListSkeletonComponent, UsersItemsListSkeletonComponent, MessagesListSkeletonComponent, AggreementComponent],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class SkeletonsModule {
}
