import {Component, Input, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {API_URL} from "../../../../../environments/environment";

@Component({
    selector: 'app-task-offers-list',
    templateUrl: './task-offers-list.component.html',
    styleUrls: ['./task-offers-list.component.scss'],
})
export class TaskOffersListComponent implements OnInit {
    @Input() offers: any;
    @Input() taskId: number;
    @Input() categoryId: number;
    @Input() statuses: any = null;

    url: string;

    constructor(private nav: NavController) {
        this.url = API_URL;
    }

    ngOnInit() {
    }

    detail(offerId: number, taskId: number, categoryId: number) {
        this.nav.navigateForward('/private/tasks/responses/' + taskId + '/' + categoryId + '/' + offerId);
    }
}
