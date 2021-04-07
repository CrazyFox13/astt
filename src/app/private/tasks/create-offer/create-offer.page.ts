import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController, ToastController} from "@ionic/angular";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.page.html',
    styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {
    taskId: number = 0;
    taskCode: string = '';
    iBlockId: number = 0;
    categoryCode: string = '';
    categoryType: string = '';
    title: string = 'Новый отклик на задание #';
    offerForm: any;
    disabled: boolean = false;
    apiKey: string = null;

    constructor(private route: ActivatedRoute, private nav: NavController, private api: ApiService,
                private formBuilder: FormBuilder, private toastController: ToastController) {
        this.offerForm = new FormGroup({
            text: new FormControl('', Validators.compose([
                Validators.minLength(1),
                Validators.required
            ])),
            taskId: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1)
            ])),
            categoryId: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1)
            ]))
        });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ionViewWillEnter() {
        if (this.apiKey !== null) {
            this.taskId = parseInt(this.route.snapshot.paramMap.get('id'));
            this.iBlockId = parseInt(this.route.snapshot.paramMap.get('iBlockId'));
            this.categoryType = this.route.snapshot.paramMap.get('categoryType');
            this.categoryCode = this.route.snapshot.paramMap.get('categoryCode');
            this.taskCode = this.route.snapshot.paramMap.get('taskCode');
            this.api._get('offercost',
                new HttpParams().set('categoryType', this.categoryType)
                    .set('categoryId', this.iBlockId.toString())
                    .set('taskId', this.taskId.toString()),
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        if (data['result']['offer'] !== null) {
                            this.nav.navigateRoot('/public/home');
                        }
                    } else {
                        this.nav.navigateRoot('/public/home');
                    }
                })
                .catch(err => {
                    this.nav.navigateRoot('/public/home');
                });
        }
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }

    submit(offerForm: any, taskId: number, categoryType: string, categoryCode: string, taskCode: string) {
        this.disabled = true;
        if (this.apiKey !== null) {
            this.api._post('createoffer',
                {
                    text: offerForm['value']['text'],
                    taskId: offerForm['value']['taskId'],
                    categoryId: offerForm['value']['categoryId'],
                    categoryType: categoryType,
                }, new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        if (data['result']['message'] == null) {
                            this.api.getUser(this.apiKey);
                            this.nav.navigateForward(`/public/tasks/${taskId}/${categoryType}/${categoryCode}/${taskCode}`);
                        } else {
                            this.disabled = false;
                            this.presentToast(data['result']['message']);
                        }
                    } else {
                        this.nav.navigateForward(`/public/tasks/${taskId}/${categoryType}/${categoryCode}/${taskCode}`);
                    }
                })
                .catch(err => {
                    this.nav.navigateForward(`/public/tasks/${taskId}/${categoryType}/${categoryCode}/${taskCode}`);
                });
        }
    }
}
