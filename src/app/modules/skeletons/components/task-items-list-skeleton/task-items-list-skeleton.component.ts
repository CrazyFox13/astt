import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-task-items-list-skeleton',
    templateUrl: './task-items-list-skeleton.component.html',
    styleUrls: ['./task-items-list-skeleton.component.scss'],
})
export class TaskItemsListSkeletonComponent implements OnInit {
    @Input() isLoaded: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
