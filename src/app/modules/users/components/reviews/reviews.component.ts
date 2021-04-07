import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
    @Input() items: any;
    @Input() user: any;
    @Input() usersStatuses: any = null;

    constructor() {
    }

    ngOnInit() {
    }
}
