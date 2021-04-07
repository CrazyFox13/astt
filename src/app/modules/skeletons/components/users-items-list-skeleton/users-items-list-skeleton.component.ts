import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-users-items-list-skeleton',
    templateUrl: './users-items-list-skeleton.component.html',
    styleUrls: ['./users-items-list-skeleton.component.scss'],
})
export class UsersItemsListSkeletonComponent implements OnInit {
    @Input() isLoaded: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
