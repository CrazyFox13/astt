import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    userForm: any;
    apiKey: string = null;
    phone: string = '';
    phoneValid: boolean = false;
    prefix: string = '7';
    rules: boolean = false;

    constructor(private api: ApiService, private nav: NavController, private formBuilder: FormBuilder,
                private storage: Storage, private toastController: ToastController) {

        this.userForm = new FormGroup({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3)
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

    async presentToast(text: string, color?: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            position: "top",
            color: color ? color : null
        });
        toast.present();
    }

    submit(userForm: any) {
        if (this.rules) {
            if (this.phone.toString().length == 11) {
                this.api._post('register', {
                        name: userForm['value']['name'],
                        email: userForm['value']['email'],
                        phone: this.phone,
                    },
                    new HttpHeaders()).subscribe((data) => {
                        if (!data['errorCode']) {
                            this.storage.set('key', data['result']['key']);
                            this.nav.navigateRoot('/public/home')
                        } else {
                            this.presentToast(data['errorMessage']);
                        }
                    },
                    (error) => {
                        this.presentToast(error['error']['errorMessage']);
                    });
            } else {
                this.presentToast('Введите корректный номер телефона', 'danger');
            }
        } else {
            alert('Для продолжения, необходимо ознакомиться с пользовательским соглашением, и принять его условия.');
        }
    }

    validatePhone($event: KeyboardEvent) {
        if ($event.key === 'Backspace') {
            if (this.phone.length >= 1) {
                this.phone = this.phone.substring(0, this.phone.length - 1);
            }

            this.phoneValid = this.phone.length == 11;
        } else {
            this.phoneValid = this.phone.length == 11;

            if (this.phone.length == 11) {
                return;
            }

            switch ($event.key) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.phone += $event.key;
                    break;
            }

            this.phoneValid = this.phone.length == 11;
        }
    }

    agree() {
        this.rules = !this.rules;
    }
}
