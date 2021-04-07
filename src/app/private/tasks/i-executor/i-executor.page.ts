import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-i-executor',
    templateUrl: './i-executor.page.html',
    styleUrls: ['./i-executor.page.scss'],
})
export class IExecutorPage implements OnInit {
    status: number = 0;
    page: number = 1;
    isLoaded: boolean = false;
    isLoadingEnd: boolean = false;
    title: string = 'Я исполнитель';
    items: any = [];
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
        this.nav.navigateForward([`/private/tasks/i-executor/detail/${id}/${categoryType}/${categoryCode}/${itemCode}`]);
    }

    loadData(event) {
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

    filter(number: number) {
        this.status = number;
        this.initialLoad();
    }

    request() {
        this.isLoadingEnd = false;
        if (this.apiKey !== null) {
            let paramsObject = {};

            if (this.status > 0) {
                paramsObject['status'] = this.status.toString();
            }

            if (this.page > 1) {
                paramsObject['page'] = this.page.toString();
            }

            this.api._get('executortasks', new HttpParams({fromObject: paramsObject}), new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.isLoaded = true;
                    if (!data['errorCode']) {
                        for (let i in data['result']['items']) {
                            this.items.push(data['result']['items'][i]);
                        }
                    } else {
                        this.isLoadingEnd = true;
                    }
                })
                .catch(err => {
                    this.isLoaded = true;
                    this.isLoadingEnd = true;
                });
        }
    }
}
