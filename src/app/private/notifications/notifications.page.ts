import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
    title: string = 'Уведомления';
    items = [];
    isLoaded: boolean = false;
    apiKey: string = null;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.apiKey !== null) {
            this.api._get('notifications', new HttpParams(), new HttpHeaders({'X-PI-KEY': this.apiKey})).subscribe((data) => {
                this.isLoaded = true;
                if (!data['errorCode']) {
                    for (let i in data['result']) {
                        this.items.push(data['result'][i]);
                    }
                }
            });
        }
    }

    ionViewWillLeave() {
        this.items = [];
    }
}
