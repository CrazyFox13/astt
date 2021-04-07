import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.page.html',
    styleUrls: ['./task-create.page.scss'],
})
export class TaskCreatePage implements OnInit {
    title: string = 'Выберите категорию';
    items: any = null;

    constructor(private api: ApiService, private nav: NavController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.api._get('categories', new HttpParams(), new HttpHeaders()).toPromise()
            .then(data => {
                this.items = data['result'];
            })
            .catch(err => {
            });
    }

    ionViewWillLeave() {
        this.items = null;
    }

    next(categoryType: string) {
        this.nav.navigateForward(`/private/task-create/select-category/${categoryType}`);
    }
}
