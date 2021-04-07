import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SocketIoService} from "../../../../services/socket-io.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    taskId: number;
    iBlockId: number;
    offerId: number;
    title: string = 'Отклик на задание #';
    item: any;
    apiKey: string = null;
    usersStatuses: any = null;

    constructor(private route: ActivatedRoute, private nav: NavController, private api: ApiService, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        this.item = [];
        if (parseInt(this.route.snapshot.paramMap.get('taskId')) && parseInt(this.route.snapshot.paramMap.get('iBlockId'))
            && parseInt(this.route.snapshot.paramMap.get('offerId'))) {
            if (this.apiKey !== null) {
                this.api._get('taskresponse',
                    new HttpParams()
                        .set('taskId', this.route.snapshot.paramMap.get('taskId').toString())
                        .set('iBlockId', this.route.snapshot.paramMap.get('iBlockId').toString())
                        .set('offerId', this.route.snapshot.paramMap.get('offerId').toString()),
                    new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                    .then(data => {
                        for (let i in data['result']) {
                            this.item = data['result'][i];
                            this.socket.putUsers([data['result'][i]['user']['c']]);
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
        this.socket.removeUsersStatuses();
    }

    setExecutor(offerId: number, taskId: number, categoryId: number) {
        if (this.apiKey !== null) {
            this.api._get('taskresponseexecutor',
                new HttpParams()
                    .set('taskId', taskId.toString())
                    .set('iBlockId', categoryId.toString())
                    .set('offerId', offerId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                })
                .catch(err => {
                });
        }
        this.nav.navigateForward(`/private/tasks/responses/${taskId}/${categoryId}`);
    }

    setCandidate(offerId: number, taskId: number, categoryId: number) {
        if (this.apiKey !== null) {
            this.api._get('taskresponsecandidate',
                new HttpParams()
                    .set('taskId', taskId.toString())
                    .set('iBlockId', categoryId.toString())
                    .set('offerId', offerId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                })
                .catch(err => {
                });
        }
        this.nav.navigateForward(`/private/tasks/responses/${taskId}/${categoryId}`);
    }

    setRejected(offerId: number, taskId: number, categoryId: number) {
        if (this.apiKey !== null) {
            this.api._get('taskresponsereject',
                new HttpParams()
                    .set('taskId', taskId.toString())
                    .set('iBlockId', categoryId.toString())
                    .set('offerId', offerId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                })
                .catch(err => {
                });
        }
        this.nav.navigateForward(`/private/tasks/responses/${taskId}/${categoryId}`);
    }

    setBlock(offerId: number, taskId: number, categoryId: number) {
        if (this.apiKey !== null) {
            this.api._get('taskresponseblock',
                new HttpParams()
                    .set('taskId', taskId.toString())
                    .set('iBlockId', categoryId.toString())
                    .set('offerId', offerId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                })
                .catch(err => {
                });
        }
        this.nav.navigateForward(`/private/tasks/responses/${taskId}/${categoryId}`);
    }
}
