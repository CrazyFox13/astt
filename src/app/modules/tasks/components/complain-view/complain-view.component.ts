import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-complain-view',
    templateUrl: './complain-view.component.html',
    styleUrls: ['./complain-view.component.scss'],
})
export class ComplainViewComponent implements OnInit {
    @Input() complain: any = null;
    @Input() owner: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
