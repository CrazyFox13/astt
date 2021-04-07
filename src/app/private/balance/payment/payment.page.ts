import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.page.html',
    styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
    title: string = 'Статус платежа #';
    id: number = 0;
    payment: any = null;
    apiKey: string = null;

    constructor(private api: ApiService, private route: ActivatedRoute, private nav: NavController) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (parseInt(this.route.snapshot.paramMap.get('id'))) {
            this.id = parseInt(this.route.snapshot.paramMap.get('id'));
            this.request(this.id);
        }
    }

    ionViewWillLeave() {
        this.id = 0;
        this.payment = null;
    }

    request(id: number) {
        this.payment = null;
        if (this.apiKey !== null) {
            this.api._get('orderstatus', new HttpParams().set('id', id.toString()), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.payment = data['result'];
                    } else {
                        this.nav.navigateRoot('/public/home');
                    }
                })
                .catch(err => {
                    this.nav.navigateRoot('/public/home');
                });
        }
    }
}
