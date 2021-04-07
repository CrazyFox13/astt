import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.page.html',
    styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
    items = [];
    addForm: any;
    apiKey: string = null;

    constructor(private api: ApiService, private nav: NavController, private formBuilder: FormBuilder,
                private toastController: ToastController) {
        this.addForm = new FormGroup({
            categoryName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3)
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
            this.api._get('portfoliolist', new HttpParams(), new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    for (let i in data['result']) {
                        this.items.push(data['result'][i]);
                    }
                })
                .catch(err => {
                });
        }
    }

    ionViewWillLeave() {
        this.items = [];
    }

    detail(id: number) {
        this.nav.navigateForward(`/private/portfolio/detail/${id}`);
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }

    submit(addForm: any) {
        if (this.apiKey !== null) {
            this.api._post('portfolioadd', addForm['value'], new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.items.push(data['result']);
                    } else {
                        this.presentToast(data['errorMessage']);
                    }
                })
                .catch(err => {
                });
        }
    }

    delete(id: number) {
        let tmp = [];
        for (let i in this.items) {
            if (this.items[i]['id'] !== id) {
                tmp.push(this.items[i]);
            }
        }

        this.items = tmp;

        if (this.apiKey !== null) {
            this.api._get('portfolioremove', new HttpParams().set('id', id.toString()), new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.presentToast('Раздёл портфолио удалён');
                    } else {
                        this.presentToast('Ошибка удаления раздела');
                    }
                })
                .catch(err => {
                    this.presentToast('Произошла ошибка. попробуйте повторить позже.');
                });
        }
    }
}
