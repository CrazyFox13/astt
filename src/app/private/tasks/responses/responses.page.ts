import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../../services/socket-io.service";

@Component({
    selector: 'app-responses',
    templateUrl: './responses.page.html',
    styleUrls: ['./responses.page.scss'],
})
export class ResponsesPage implements OnInit {
    id: number;
    iBlockId: number;
    title: string = 'Отклики на задание #';
    titleAppend: string = '';
    offers = [];
    apiKey: string = null;
    usersStatuses: any = null;

    constructor(private route: ActivatedRoute, private nav: NavController, private api: ApiService,
                private socket: SocketIoService) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (parseInt(this.route.snapshot.paramMap.get('id')) && parseInt(this.route.snapshot.paramMap.get('iBlockId'))) {
            this.titleAppend = this.route.snapshot.paramMap.get('id');
            if (this.apiKey !== null) {
                this.id = parseInt(this.route.snapshot.paramMap.get('id'));
                this.api._get('taskresponses',
                    new HttpParams().set('id', this.route.snapshot.paramMap.get('id').toString())
                        .set('iBlockId', this.route.snapshot.paramMap.get('iBlockId').toString()),
                    new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                    .then(data => {
                        let ids = [];
                        for (let i in data['result']) {
                            this.offers.push(data['result'][i]);

                            ids.push(data['result'][i]['user']['c']);
                        }

                        this.socket.putUsers(ids);
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
        this.offers = [];
        this.socket.removeUsersStatuses();
    }
}
