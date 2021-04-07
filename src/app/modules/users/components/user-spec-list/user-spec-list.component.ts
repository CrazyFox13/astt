import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-spec-list',
    templateUrl: './user-spec-list.component.html',
    styleUrls: ['./user-spec-list.component.scss'],
})
export class UserSpecListComponent implements OnInit {
    @Input() items: any = null;

    constructor() {
    }

    ngOnInit() {
    }

}
