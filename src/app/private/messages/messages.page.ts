import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../services/socket-io.service";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
    title: string = 'Сообщения';
    isLoaded: boolean = false;
    items: any = [];
    apiKey: string = null;
    unreadRooms: any = null;

    constructor(private api: ApiService, private socket: SocketIoService, private nav: NavController) {
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.socket.unreadRooms.subscribe(unreadRooms => this.unreadRooms = unreadRooms);
    }

    ionViewWillEnter() {
        this.request();
    }

    ionViewWillLeave() {
        this.items = [];
    }

    private request() {
        this.api._get('chatrooms', new HttpParams(), new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
            .then(data => {
                this.isLoaded = true;
                for (let i in data['result']) {
                    this.items.push(data['result'][i]);
                    this.socket.putUnread(data['result'][i]['id'], data['result'][i]['unread']);
                }
            })
            .catch(err => {
                this.isLoaded = true;
            });
    }

    detail(roomId: string, taskId: number) {
        this.nav.navigateForward(`/private/messages/detail/${roomId}/${taskId}`);
    }
}
