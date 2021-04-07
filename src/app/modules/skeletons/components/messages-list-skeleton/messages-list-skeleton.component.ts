import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-messages-list-skeleton',
    templateUrl: './messages-list-skeleton.component.html',
    styleUrls: ['./messages-list-skeleton.component.scss'],
})
export class MessagesListSkeletonComponent implements OnInit {
    @Input() isLoaded: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
