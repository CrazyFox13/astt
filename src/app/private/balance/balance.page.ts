import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-balance',
    templateUrl: './balance.page.html',
    styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
    title: string = 'Пополнение баланса';
    orderId: number = 0;
    url: any = null;
    balanceForm: any;
    back: string = '/public/home';
    apiKey: string = null;

    constructor(private api: ApiService, private nav: NavController, private sanitizer: DomSanitizer) {
        this.balanceForm = new FormGroup({
            amount: new FormControl('', Validators.compose([
                Validators.min(1),
                Validators.required
            ]))
        });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {

    }

    ionViewWillLeave() {
        this.orderId = 0;
        this.url = null;
    }

    submit(balanceForm: any) {
        if (this.apiKey !== null) {
            this.api._post('createorder', {
                amount: parseInt(balanceForm['value']['amount']),
                type: 'balance'
            }, new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.orderId = data['result']['id'];
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data['result']['redirect']);
                        this.back = `/private/balance/payment/${data['result']['id']}`;
                    }
                })
                .catch(err => {
                });
        }
    }
}
