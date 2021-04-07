import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    id: number;
    categoryType: string;
    categoryCode: string;
    itemCode: string;
    title: string = 'Задание #';
    item: any;
    mapRoute: any = null;
    mapLat: number = 0;
    mapLong: number = 0;
    apiKey: string = null;

    constructor(private route: ActivatedRoute, private nav: NavController, private api: ApiService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        this.item = [];

        if (parseInt(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('categoryType')
            && this.route.snapshot.paramMap.get('categoryCode') && this.route.snapshot.paramMap.get('itemCode')) {
            if (this.apiKey !== null) {
                this.api._get('task',
                    new HttpParams().set('id', this.route.snapshot.paramMap.get('id').toString())
                        .set('itemCode', this.route.snapshot.paramMap.get('itemCode'))
                        .set('categoryCode', this.route.snapshot.paramMap.get('categoryCode'))
                        .set('categoryType', this.route.snapshot.paramMap.get('categoryType')),
                    new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                    .then(data => {
                        if (!data['errorCode']) {
                            console.log(data['result']);
                            this.item = data['result'];
                            this.mapRoute = data['result']['route'];
                            this.mapLat = data['result']['lat'];
                            this.mapLong = data['result']['long'];
                        } else {
                            this.nav.navigateRoot('/public/home');
                        }
                    })
                    .catch(err => {
                        this.nav.navigateRoot('/public/home');
                    });
            }
        } else {
            this.nav.navigateRoot('/public/home');
        }
    }

    ionViewWillLeave() {
        this.item = [];
        this.mapRoute = null;
        this.mapLat = 0;
        this.mapLong = 0;
    }

    responses(id: any, categoryId: any) {
        this.nav.navigateForward(`/private/tasks/responses/${id}/${categoryId}`);
    }

    redirect(id: any, categoryType: any, categoryCode: any, itemCode: any) {
        this.nav.navigateForward(`/private/tasks/edit/${id}/${categoryType}/${categoryCode}/${itemCode}`);
    }

    complete(id: number, categoryId: number, status: number, executor: any) {
        if (status == 1 && executor == null) {
            this.api._get('completetask',
                new HttpParams().set('id', id.toString()).set('categoryId', categoryId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.item['status'] = 3;
                    this.nav.navigateForward(`/private/tasks`);
                })
                .catch(err => {
                });
        }
    }
}
