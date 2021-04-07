import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../services/socket-io.service";

@Component({
    selector: 'app-black-list',
    templateUrl: './black-list.page.html',
    styleUrls: ['./black-list.page.scss'],
})
export class BlackListPage implements OnInit {
    title: string = 'Чёрный список';
    items: any = [];
    isLoaded: boolean = false;
    apiKey: string = null;
    usersStatuses: any = null;
    users: any = [];

    constructor(private api: ApiService, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.apiKey !== null) {
            this.api._get('blacklist', new HttpParams(), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    this.isLoaded = true;
                    for (let i in data['result']) {
                        this.items.push(data['result'][i]);
                    }

                    for (let i in this.items) {
                        let f = false;
                        for (let ii in this.users) {
                            if (this.users[ii] == this.items[i]['c']) {
                                f = true;
                            }
                        }

                        if (!f) {
                            this.users.push(this.items[i]['c']);
                        }
                    }

                    this.socket.putUsers(this.users);
                })
                .catch(err => {
                    this.isLoaded = true;
                });
        }
    }

    ionViewWillLeave() {
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
    }

    remove(id: number) {
        if (this.apiKey !== null) {
            this.api._get('removefromblacklist', new HttpParams().set('id', id.toString()), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.items = [];
                        for (let i in data['result']) {
                            this.items.push(data['result'][i]);
                        }
                    }
                })
                .catch(err => {
                });
        }
    }
}
