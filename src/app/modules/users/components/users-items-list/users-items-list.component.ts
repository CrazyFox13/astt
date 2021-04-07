import {Component, Input, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ApiService} from "../../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {API_URL} from "../../../../../environments/environment";

@Component({
    selector: 'app-users-items-list',
    templateUrl: './users-items-list.component.html',
    styleUrls: ['./users-items-list.component.scss'],
})
export class UsersItemsListComponent implements OnInit {
    @Input() items: any = null;
    @Input() statuses: any = null;
    @Input() blockedUsers: any = [];
    url: string;
    apiKey: string = null;

    constructor(private nav: NavController, private api: ApiService) {
        this.url = API_URL;
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    detail(id: number) {
        this.nav.navigateForward(`/public/users/detail/${id}`)
    }

    delete(id: number): void {
        if (this.items !== null) {
            for (let i in this.items) {
                if (this.items[i]['id'] == id) {
                    this.items[i]['isFavourite'] = false;
                    this.request(id);
                    break
                }
            }
        }
    }

    add(id: number): void {
        if (this.items !== null) {
            for (let i in this.items) {
                if (this.items[i]['id'] == id) {
                    this.items[i]['isFavourite'] = true;
                    this.request(id);
                    break
                }
            }
        }
    }

    request(id: number): void {
        if (this.apiKey !== null) {
            this.api._get('changefavourites', new HttpParams().set('id', id.toString()), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                })
                .catch(err => {
                });
        }
    }
}
