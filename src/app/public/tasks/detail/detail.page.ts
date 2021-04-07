import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../../services/socket-io.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    id: number;
    itemCode: string;
    categoryCode: string;
    categoryType: string;
    item = null;
    title = 'Задание #';
    map = false;
    mapRoute: any = null;
    mapLat: number = 0;
    mapLong: number = 0;
    apiKey: string = null;
    user: any = null;
    usersStatuses: any = null;
    users: any = [];

    constructor(private route: ActivatedRoute, private nav: NavController, private api: ApiService, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.api.user.subscribe(user => this.user = user);
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
        this.user = [];
        this.item = [];
        this.mapRoute = null;
        this.mapLat = 0;
        this.mapLong = 0;
        this.users = [];
        this.socket.removeUsersStatuses();
    }

    ionViewWillEnter() {
        this.map = false;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.itemCode = this.route.snapshot.paramMap.get('itemCode');
        this.categoryCode = this.route.snapshot.paramMap.get('categoryCode');
        this.categoryType = this.route.snapshot.paramMap.get('categoryType');
        this.api._get('task',
            new HttpParams().set('id', this.id.toString()).set('itemCode', this.itemCode).set('categoryCode', this.categoryCode).set('categoryType', this.categoryType),
            new HttpHeaders()).toPromise()
            .then(data => {
                if (!data['errorCode']) {
                    this.item = data['result'];
                    this.mapRoute = data['result']['route'];
                    this.mapLat = data['result']['lat'];
                    this.mapLong = data['result']['long'];
                    this.users.push(data['result']['user']['c']);
                    this.socket.putUsers(this.users);
                } else {
                    this.nav.navigateRoot('/public/home');
                }
            })
            .catch(err => {
                this.nav.navigateRoot('/public/home');
            });
    }

    ionViewWillLeave() {
        this.id = 0;
        this.itemCode = '';
        this.categoryType = '';
        this.categoryCode = '';
        this.user = [];
        this.item = [];
        this.mapRoute = null;
        this.mapLat = 0;
        this.mapLong = 0;
        this.users = [];
        this.socket.removeUsersStatuses();
    }

    userPage(id: number) {
        this.nav.navigateForward(`/public/users/detail/${id}`);
    }
}
