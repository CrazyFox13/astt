import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController, Platform} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../services/socket-io.service";
import {TaskItem} from "../../interfaces/task-item";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    title: string = 'astt.su';
    page: number = 1;
    isLoaded: boolean = false;
    isLoadedEnd: boolean = false;
    items: TaskItem[] = [];
    type: string = null;
    apiKey: string = null;
    usersStatuses: any = null;
    users: any = [];
    blockedUsers: any = [];

    constructor(private api: ApiService, private nav: NavController, private platform: Platform, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        this.blocked();
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.page = 1;
        this.request();
    }

    ionViewWillLeave() {
        this.blockedUsers = [];
        this.items = [];
        this.page = 1;
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.type = null;
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
        this.blocked();
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.page = 1;
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
        this.request();
    }

    doRefresh(event) {
        this.isLoaded = false;
        this.isLoadedEnd = false;
        this.page = 1;
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
        this.request();

        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    cities() {
        this.nav.navigateForward('/public/cities');
    }

    request() {
        let paramsObject = {};

        if (this.page > 1) {
            paramsObject['page'] = this.page.toString();
        }

        if (this.type !== null) {
            paramsObject[this.type] = '1';
        }

        this.api._get('tasks',
            new HttpParams({fromObject: paramsObject}),
            new HttpHeaders()).toPromise()
            .then(data => {
                this.isLoaded = true;
                for (let i in data['result']) {
                    this.items.push(data['result'][i]);
                }

                for (let i in this.items) {
                    let f = false;
                    for (let ii in this.users) {
                        if (this.users[ii] == this.items[i]['user']['c']) {
                            f = true;
                        }
                    }

                    if (!f) {
                        this.users.push(this.items[i]['user']['c']);
                    }
                }

                this.socket.putUsers(this.users);
            })
            .catch(err => {
                this.isLoaded = true;
                this.isLoadedEnd = true;
            });
    }

    filter(type: string) {
        switch (type) {
            case 'quickly':
            case 'safe':
            case 'noResponses':
            case 'lessThan10':
                this.type = type;
                break;
            case 'reset':
                this.type = null;
                break;
            default:
                this.type = null;
        }

        this.isLoaded = false;
        this.page = 1;
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
        this.request();
    }

    private blocked() {
        if (this.apiKey !== null) {
            this.api._get('blacklist', new HttpParams(), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    this.blockedUsers = [];
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
