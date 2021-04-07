import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-my-offer',
    templateUrl: './my-offer.component.html',
    styleUrls: ['./my-offer.component.scss'],
})
export class MyOfferComponent implements OnInit, OnChanges {
    @Input() user: any = null;
    @Input() categoryCode: string = null;
    @Input() categoryType: string = null;
    @Input() categoryId: number = null;
    @Input() taskUserId: number = null;
    @Input() taskCode: string = null;
    @Input() apiKey: string = null;
    @Input() taskId: number = null;
    @Input() taskStatus: number = null;

    offer: any = null;
    cost: number = 0;
    status: number = 0;
    isLoaded: boolean = false;

    constructor(private api: ApiService, private nav: NavController) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.user !== null && this.categoryId !== null && this.categoryType !== null && this.taskUserId !== null
            && this.taskId !== null && this.taskStatus !== null && this.categoryCode !== null && this.taskCode !== null
            && this.apiKey !== null && !this.isLoaded) {
            if (this.user['id'] !== this.taskUserId) {
                this.status = this.taskStatus;
                this.api._get('offercost',
                    new HttpParams()
                        .set('categoryType', this.categoryType)
                        .set('categoryId', this.categoryId.toString())
                        .set('taskId', this.taskId.toString()),
                    new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                    .then(data => {
                        this.isLoaded = true;
                        if (!data['errorCode']) {
                            this.cost = data['result']['cost'];
                            this.offer = data['result']['offer'];

                            if (this.taskStatus == 2 && this.offer !== null) {
                                if (this.offer['isExecutor']) {
                                    console.log(this.offer);
                                }
                            }
                        }
                    })
                    .catch(err => {
                        this.isLoaded = true;
                    });
            }
        }
    }

    createOffer(taskId: number, categoryId: number, categoryType: string, categoryCode: string, taskCode: string) {
        this.nav.navigateForward(`/private/tasks/create-offer/${taskId}/${categoryId}/${categoryType}/${categoryCode}/${taskCode}`);
    }

    offerConfirm(taskStatus: number, taskId: number, categoryId: number, key: string) {
        if (taskStatus == 4 && key.length == 32) {
            this.status = 2;
            this.taskStatus = this.status;
            this.api._get('offerconfirm',
                new HttpParams().set('categoryId', categoryId.toString()).set('taskId', taskId.toString()),
                new HttpHeaders({'X-PI-KEY': key})).toPromise()
                .then(data => {
                    this.status = 2;
                    this.taskStatus = this.status;
                })
                .catch(err => {
                });
        }

        this.nav.navigateForward(`/private/tasks/i-executor/detail/${taskId}/${categoryId}`);
    }

    offerReject(taskStatus: number, taskId: number, categoryId: number, offerId: number, key: string) {
        if (taskStatus == 4 && key.length == 32) {
            this.api._get('offerreject',
                new HttpParams().set('categoryId', categoryId.toString()).set('taskId', taskId.toString()).set('offerId', offerId.toString()),
                new HttpHeaders({'X-PI-KEY': key})).toPromise()
                .then(data => {
                    this.status = 1;
                    this.taskStatus = this.status;
                })
                .catch(err => {
                });
        }

        this.nav.navigateForward(`/public/tasks/i-executor`);
    }

    redirectToTask(taskId: number, categoryId: number) {
        this.nav.navigateForward(`/private/tasks/i-executor/detail/${taskId}/${categoryId}`);
    }
}
