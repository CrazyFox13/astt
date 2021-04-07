import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../../../../services/socket-io.service";

@Component({
    selector: 'app-neutral',
    templateUrl: './neutral.page.html',
    styleUrls: ['./neutral.page.scss'],
})
export class NeutralPage implements OnInit {
    userId: number = null;
    type: string = 'neutral';
    items: any = null;
    user: any = null;
    title: string = 'Нейтральные отзывы';
    usersStatuses: any = null;

    constructor(private api: ApiService, private route: ActivatedRoute, private nav: NavController, private socket: SocketIoService) {
    }

    ngOnInit() {
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.route.snapshot.paramMap.get('userId') !== undefined) {
            this.userId = parseInt(this.route.snapshot.paramMap.get('userId'));
            if (this.userId > 0) {
                this.api._get('reviews',
                    new HttpParams().set('id', this.userId.toString()).set('type', this.type.toString()),
                    new HttpHeaders()).toPromise()
                    .then(data => {
                        this.user = data['result']['user'];
                        this.items = data['result']['reviews'];
                        this.socket.putUsers([this.user['c']]);
                    })
                    .catch(err => {
                    });
            } else {
                this.nav.navigateRoot('/public/users');
            }
        }
    }

    ionViewWillLeave() {
        this.userId = null;
        this.items = null;
        this.socket.removeUsersStatuses();
    }
}
