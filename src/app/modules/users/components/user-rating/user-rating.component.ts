import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-rating',
    templateUrl: './user-rating.component.html',
    styleUrls: ['./user-rating.component.scss'],
})
export class UserRatingComponent implements OnInit {
    @Input() rating: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
