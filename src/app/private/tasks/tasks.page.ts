import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    public status: number = 0;
    page = 1;
    isLoaded = false;
    isLoadingEnd = false;
    title = 'Мои заявки';
    items = [];
    apiKey: string = null;

    constructor(private api: ApiService, private nav: NavController) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        this.initialLoad();
    }

    ionViewWillLeave() {
        this.page = 1;
        this.isLoaded = false;
        this.items = [];
    }

    initialLoad() {
        this.items = [];
        this.isLoaded = false;
        this.isLoadingEnd = false;
        this.page = 1;
        this.request();
    }

    detail(id: any, itemCode: string, categoryCode: string, categoryType: string) {
        this.nav.navigateForward(['/private/tasks/detail/' + id + '/' + categoryType + '/' + categoryCode + '/' + itemCode]);
    }

    loadData(event) {
        this.isLoadingEnd = false;
        this.page = (this.page + 1);
        this.request();

        setTimeout(() => {
            event.target.complete();

            if (this.items.length == 1000) {
                event.target.disabled = true;
            }
        }, 1000);
    }

    doRefresh(event) {
        this.initialLoad();

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    request() {
        this.items = [];
        if (this.apiKey !== null) {
            let paramsObject = {};

            if (this.status > 0) {
                paramsObject['status'] = this.status.toString();
            }

            if (this.page > 1) {
                paramsObject['page'] = this.page.toString();
            }

            this.api._get('tasks', new HttpParams({fromObject: paramsObject}), new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.isLoadingEnd = true;
                    for (let i in data['result']) {
                        this.items.push(data['result'][i]);
                    }
                })
                .catch(err => {
                    this.isLoaded = true;
                    this.isLoadingEnd = true;
                });
        }
    }

    filter(number: number) {
        this.status = number;
        this.initialLoad();
    }
}
