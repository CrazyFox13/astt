import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../services/socket-io.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
    title: string = 'Исполнители';
    page: number = 1;
    isLoaded: boolean = false;
    isLoadedEnd: boolean = false;
    items: any = [];
    apiKey: string = null;
    usersStatuses: any = null;
    users: any = [];
    blockedUsers: any = [];

    constructor(private api: ApiService, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        this.blocked();
        this.page = 1;
        this.request();
    }

    ionViewWillLeave() {
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
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

    refresh() {
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.page = 1;
        this.items = [];
        this.socket.removeUsersStatuses();
        this.request();
    }

    doRefresh(event) {
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.page = 1;
        this.items = [];
        this.socket.removeUsersStatuses();
        this.request();

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    request() {
        let paramsObject = {};
        let headers = new HttpHeaders();

        if (this.apiKey !== null) {
            headers = new HttpHeaders({'X-PI-KEY': this.apiKey});
        }

        if (this.page > 1) {
            paramsObject['page'] = this.page.toString();
        }

        this.api._get('users', new HttpParams({fromObject: paramsObject}), headers).toPromise()
            .then(data => {
                this.isLoaded = true;
                if (!data['errorCode']) {
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
                }
            })
            .catch(err => {
                this.isLoaded = true;
                this.isLoadedEnd = true;
            });
    }

    private blocked() {
        if (this.apiKey !== null) {
            this.api._get('blacklist', new HttpParams(), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    for (let i in data['result']) {
                        this.blockedUsers[data['result'][i]['id']] = true;
                    }
                })
                .catch(err => {
                    this.isLoaded = true;
                });
        }
    }
}
