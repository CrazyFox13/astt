import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {HttpHeaders} from "@angular/common/http";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-complain',
    templateUrl: './complain.component.html',
    styleUrls: ['./complain.component.scss'],
})
export class ComplainComponent implements OnInit {
    @Input() task: any;
    @Input() apiKey: string = null;

    constructor(private api: ApiService, private toastController: ToastController) {
    }

    ngOnInit() {
    }

    complain(task: any) {
        if (this.apiKey == null) {
            alert('Авторизуйтесь, чтобы отправить жалобу на контент');
        } else {
            this.api._post('complain',
                {
                    id: task['id'],
                    categoryId: task['categoryId']
                },
                new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.presentToast(
                        'Жалоба отправлена',
                        'Мы получили Вашу жалобу на этот контент. В ближайшее время примем меры, или свяжемся с Вами. Спасибо.'
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
            duration: 5000
        });
        toast.present();
    }
}
