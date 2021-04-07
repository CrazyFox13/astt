import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {PushService} from "../../services/push.service";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    userForm: any;
    apiKey: string = null;
    rules: boolean = false;

    constructor(private api: ApiService, private nav: NavController, private formBuilder: FormBuilder,
                private storage: Storage, private toastController: ToastController, private push: PushService) {
        this.userForm = new FormGroup({
            password: new FormControl('', Validators.compose([
                Validators.minLength(6),
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                Validators.required
            ]))
        });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.apiKey !== null) {
            this.nav.navigateRoot('/public/home');
        }
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }

    submit(userForm: any) {
        if (this.rules) {
            this.api._get('auth', new HttpParams(), new HttpHeaders({
                "X-PI-EMAIL": userForm['value']['email'],
                "X-PI-PASSWORD": userForm['value']['password']
            })).toPromise()
                .then(async data => {
                    if (!data['errorCode']) {
                        await this.storage.set('key', data['result']['key']);
                        this.api.changeAuthState(true);
                        this.api.changeApiKey(data['result']['key']);
                        this.api.getUser(data['result']['key']);
                        this.push.subscribe();
                        this.nav.navigateRoot('/public/home');
                    } else {
                        this.presentToast(data['errorMessage']);
                    }
                })
                .catch(err => {
                    this.nav.navigateRoot('/public/home');
                });
        } else {
            alert('Для продолжения, необходимо ознакомиться с пользовательским соглашением, и принять его условия.');
        }
    }

    agree() {
        this.rules = !this.rules;
    }
}
