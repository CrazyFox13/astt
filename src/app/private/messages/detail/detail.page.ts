import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {SocketIoService} from "../../../services/socket-io.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
    title: string = 'Чат по заданию #';
    isLoaded: boolean = false;
    items: any = [];
    user: any = null;
    apiKey: string = null;
    roomId: string = null;
    taskId: number = 0;
    initRoom: string = null;

    constructor(private api: ApiService, private socket: SocketIoService, private nav: NavController, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.api.user.subscribe(user => this.user = user);
        this.socket.roomId.subscribe(roomId => this.roomId = roomId);
    }

    ngOnDestroy(): void {
        if (this.initRoom !== null) {
            this.socket.getInstance().removeListener(this.initRoom + ' new message', (data) => {
            });
        }
    }

    ionViewWillEnter() {
        this.taskId = parseInt(this.route.snapshot.paramMap.get('taskId'));
        this.initRoom = this.route.snapshot.paramMap.get('roomId');
        this.socket.unSetRoomId();
        this.request();
    }

    ionViewWillLeave() {
        this.items = [];
        this.socket.unSetRoomId();
        if (this.initRoom !== null) {
            this.socket.getInstance().removeListener(this.initRoom + ' new message', (data) => {
            });
        }
    }

    private request() {
        this.socket.setRoomId(this.initRoom, this.taskId);
        this.api._get('chatid',
            new HttpParams().set('taskId', this.taskId.toString()).set('id', this.initRoom),
            new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
            .then(data => {
                this.isLoaded = true;
                this.socket.removeUnread(this.initRoom);
                for (let i in data['result']) {
                    this.items.push(data['result'][i]);
                }

                this.socket.getInstance().on(this.initRoom + ' new message', (data) => {
                    if (data['roomId'] == this.initRoom) {
                        this.items.push(data);
                    }
                });
            })
            .catch(err => {
                this.socket.unSetRoomId();
            });
    }
}
