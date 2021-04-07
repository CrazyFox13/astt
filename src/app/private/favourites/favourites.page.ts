import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {SocketIoService} from "../../services/socket-io.service";

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.page.html',
    styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
    title: string = 'Избранные исполнители';
    isLoaded: boolean = false;
    items: any = [];
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
        this.request();
    }

    ionViewWillLeave() {
        this.items = [];
        this.users = [];
        this.socket.removeUsersStatuses();
    }

    loadData(event) {
        this.request();

        setTimeout(() => {
            event.target.complete();

            if (this.items.length == 1000) {
                event.target.disabled = true;
            }
        }, 1000);
    }

    private request() {
        this.api._get('favourites',
            new HttpParams(),
            new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
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
