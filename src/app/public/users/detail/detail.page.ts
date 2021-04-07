import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {NavController, ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {API_URL} from "../../../../environments/environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    item: any = [];
    id: number = 0;
    url: string;
    apiKey: string = null;
    user: any = null;
    complainForm: any;
    complainMode: boolean = false;
    complainDisallow: boolean = false;
    complainCompleted: boolean = false;

    constructor(private api: ApiService, private nav: NavController, private route: ActivatedRoute,
                private toastController: ToastController) {
        this.url = API_URL;

        this.complainForm = new FormGroup({
            text: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ])),
        });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
        this.api.user.subscribe(user => this.user = user);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.route.snapshot.paramMap.get('id') !== undefined) {
            this.id = parseInt(this.route.snapshot.paramMap.get('id'));

            if (this.id > 0) {
                this.api._get('user',
                    new HttpParams().set('id', this.route.snapshot.paramMap.get('id').toString()),
                    new HttpHeaders()).toPromise()
                    .then(data => {
                        if (!data['errorCode']) {
                            this.item = data['result'];

                            if (this.user !== null) {
                                this.complainDisallow = this.item.id == this.user.id;
                            }
                        }
                    })
                    .catch(err => {
                    });
            } else {
                this.nav.navigateRoot('/public/users');
            }
        } else {
            this.nav.navigateRoot('/public/users');
        }
    }

    ionViewWillLeave() {
        this.id = 0;
        this.item = [];
    }

    portfolio(categoryId: number, userId: number) {
        this.nav.navigateForward(`/public/users/detail/portfolio/${userId}/${categoryId}`);
    }

    reviews(type: string, userId: number, qty: number) {
        if (qty > 0) {
            switch (type) {
                case 'positive':
                case 'negative':
                case 'neutral':
                    this.nav.navigateForward(`/public/users/detail/reviews/${type}/${userId}`);
                    break;
            }
        }
    }

    tasks(type: string, qty: number, userId: number) {
        if (qty > 0) {
            this.nav.navigateForward(`/public/users/detail/tasks/${type}/${userId}`);
        }
    }

    complain(id: number) {
        if (this.apiKey == null) {
            alert('Пожалуйста, авторизуйтесь');
        } else {
            this.complainMode = true;
        }
    }

    submitComplain(complainForm: any) {
        if (this.apiKey !== null && this.complainMode && !this.complainCompleted && !this.complainDisallow) {
            this.api._post('complain',
                {
                    userId: this.id,
                    text: complainForm['value']['text']
                },
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.complainCompleted = true;
                    this.presentToast(
                        'Жалоба отправлена',
                        'Мы получили Вашу жалобу на этого пользователя. В ближайшее время примем меры, или свяжемся с Вами. Спасибо.'
                    );
                })
                .catch(err => {
                });
        }
    }

    private async presentToast(header: string, text: string) {
        const toast = await this.toastController.create({
            header: header,
            message: text,
            position: 'top',
            duration: 3000
        });
        toast.present();
    }
}
