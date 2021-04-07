import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../../../../services/socket-io.service";
import {TaskItem} from "../../../../../interfaces/task-item";

@Component({
    selector: 'app-completed',
    templateUrl: './completed.page.html',
    styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {
    userId: number = 0;
    items: TaskItem[] = [];
    user: any = null;
    title: string = 'Выполненные заявки';
    isLoaded: boolean = false;
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
                this.api._get('usercompletedtasks',
                    new HttpParams().set('id', this.userId.toString()),
                    new HttpHeaders()).toPromise()
                    .then(data => {
                        this.isLoaded = true;
                        if (!data['errorCode']) {
                            this.user = data['result']['user'];
                            this.items = data['result']['items'];
                            this.socket.putUsers([this.user['c']]);
                        }
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
