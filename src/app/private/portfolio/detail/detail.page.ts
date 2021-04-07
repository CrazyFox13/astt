import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {NavController, ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {API_URL} from "../../../../environments/environment";
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    empty: boolean = false;
    items: any = [];
    title: string = '';
    apiKey: string = null;
    url: string;
    photos: any = null;

    photo: SafeResourceUrl;

    constructor(private api: ApiService, private nav: NavController, private route: ActivatedRoute,
                private toastController: ToastController, private sanitizer: DomSanitizer) {
        this.url = API_URL;
    }

    async takePicture() {
        const image = await Plugins.Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });

        if (this.photos == null) {
            this.photos = [];
        }

        //this.photos.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))});

        this.upload(image.dataUrl);
    }

    private upload(base64: string) {
        this.api._post('portfoliouploadfiles',
            {file: base64, id: this.route.snapshot.paramMap.get('id').toString()},
            new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
            .then(data => {
                this.items.push(data['result']);
                this.presentToast('Файл добавлен в портфолио');
            })
            .catch(err => {
            });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.apiKey !== null) {
            this.api._get('portfolioget',
                new HttpParams().set('id', this.route.snapshot.paramMap.get('id').toString()),
                new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    this.title = data['result']['name'];
                    for (let i in data['result']['files']) {
                        this.items.push(data['result']['files'][i]);
                    }

                    if (!this.items.length) {
                        this.empty = true;
                    }
                })
                .catch(err => {
                });
        }
    }

    ionViewWillLeave() {
        this.items = [];
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }

    delete(id: number) {
        let tmp = [];
        for (let i in this.items) {
            if (this.items[i]['id'] !== id) {
                tmp.push(this.items[i]);
            }
        }

        this.items = tmp;

        if (!this.items.length) {
            this.empty = true;
        }

        if (this.apiKey !== null) {
            this.api._get('portfolioremovefile',
                new HttpParams().set('id', this.route.snapshot.paramMap.get('id').toString()).set('fileId', id.toString()),
                new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    if (!data['errorCode']) {
                        this.presentToast('Файл удалён из портфолио');
                    } else {
                        this.presentToast('Ошибка удаления файла');
                    }
                })
                .catch(err => {
                    this.presentToast('Ошибка удаления файла');
                });
        }
    }

    changeDescription(id: number) {
        let val = (<HTMLInputElement>document.getElementById('description' + id)).value;
        this.api._post('portfoliochangefiledescription', {
            id: parseInt(this.route.snapshot.paramMap.get('id')),
            fileId: id,
            description: val
        }, new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
            .then(data => {
                if (!data['errorCode']) {
                    this.presentToast('Описание файла изменено');
                } else {
                    this.presentToast('Ошибка изменения описания файла');
                }
            })
            .catch(err => {
                this.presentToast('Ошибка изменения описания файла');
            });
    }
}
