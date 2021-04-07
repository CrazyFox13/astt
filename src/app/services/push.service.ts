import {Injectable} from '@angular/core';
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';
import {ApiService} from "./api.service";
import {HttpHeaders} from "@angular/common/http";
import {NavController, ToastController} from "@ionic/angular";

const {PushNotifications} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PushService {
    private lastId: string = null;
    showToast: boolean = true;

    constructor(private api: ApiService, private nav: NavController, private toastController: ToastController) {
    }

    async subscribe() {
        await this.api.initKey()
            .then(apiKey => {
                if (apiKey !== null) {
                    PushNotifications.register();
                    PushNotifications.addListener('registration',
                        (token: PushNotificationToken) => {
                            this.api._post('createusertoken', {token: token.value},
                                new HttpHeaders({'X-PI-KEY': apiKey}))
                                .toPromise()
                                .then(data => {
                                    //alert('REGISTER: ' + token.value);
                                })
                                .catch(error => console.log(JSON.stringify(error)));
                        }
                    );
                    // PushNotifications.addListener('registrationError',
                    //     (error: any) => {
                    //
                    //     }
                    // );
                    //Пуш когда пользователь в приложении
                    PushNotifications.addListener('pushNotificationReceived',
                        (notification: PushNotification) => {
                            if (this.showToast) {
                                if (notification['id'] !== this.lastId) {
                                    this.lastId = notification['id'];

                                    switch (notification['data']['pushType']) {
                                        case 'newTask':
                                        case 'newMessage':
                                            this.presentToast(notification['title'], notification['body']);
                                            break;
                                    }
                                }
                            }
                        }
                    );

                    //Пуш когда приложение закрыто и пользователь кликнул по сообщению
                    PushNotifications.addListener('pushNotificationActionPerformed',
                        (notification: PushNotificationActionPerformed) => {
                            if (notification['notification']['id'] !== this.lastId) {
                                this.lastId = notification['notification']['id'];

                                switch (notification['notification']['data']['pushType']) {
                                    case 'newTask':
                                    case 'newMessage':
                                        this.nav.navigateForward(notification['notification']['data']['path']);
                                        break;
                                }
                            }
                        }
                    );
                }
            })
            .catch(err => console.log(err));
    }

    private async presentToast(header: string, text: string) {
        const toast = await this.toastController.create({
            header: header,
            message: text,
            position: 'top',
            duration: 1500
        });
        toast.present();
    }
}
