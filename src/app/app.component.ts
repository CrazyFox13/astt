import {Component, OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ApiService} from "./services/api.service";
import {PushService} from "./services/push.service";
import {SocketIoService} from "./services/socket-io.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {KeyboardInfo, Plugins} from '@capacitor/core';

const {Keyboard} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    isAuthorized: boolean = false;
    apiKey: string = null;
    user: any = null;
    isExecutor: boolean = false;
    unread: number = 0;
    taskId: number = 0;
    roomId: string = null;
    chatForm: any;
    kb: boolean = false;

    constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar,
                private menu: MenuController, private api: ApiService, private nav: NavController,
                private push: PushService, private socket: SocketIoService
    ) {
        this.initializeApp();
        this.chatForm = new FormGroup({
            message: new FormControl('', Validators.compose([
                Validators.minLength(1),
                Validators.required
            ]))
        });
    }

    ngOnInit() {
        Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
            console.log('keyboard will show with height', info.keyboardHeight);
            this.kb = true;
        });

        Keyboard.addListener('keyboardWillHide', () => {
            console.log('keyboard will hide');
            this.kb = false;
        });

        this.api.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.api.user.subscribe(user => this.user = user);
        this.socket.unread.subscribe(unread => this.unread = unread);
        this.socket.roomId.subscribe(roomId => this.roomId = roomId);
        this.socket.taskId.subscribe(taskId => this.taskId = taskId);
        this.push.subscribe();

        this.api.initKey().then((val) => {
            if (val !== null) {
                this.api.getUser(val);
            }
        });
    }

    ngOnDestroy() {
        this.socket.close();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    redirect(to: string) {
        this.menu.close();
        this.nav.navigateForward('/' + to);
    }

    add() {
        if (this.isAuthorized) {
            this.redirect('/private/task-create');
        } else {
            this.redirect('/public/auth');
        }
    }

    messages() {
        if (this.isAuthorized) {
            this.redirect('/private/messages');
        } else {
            this.redirect('/public/auth');
        }
    }

    sendMessage(roomId: string, taskId: number, chatForm: any) {
        if (roomId !== null && taskId > 0 && chatForm['value']['message'] && chatForm['value']['message'] !== null) {
            this.api._post('sendmessage', {
                    id: roomId,
                    taskId: taskId,
                    text: chatForm['value']['message']
                },
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.socket.getInstance().emit('new message', data['result']);
                })
                .catch(err => {
                });

            chatForm.controls['message'].reset();
        }
    }
}
