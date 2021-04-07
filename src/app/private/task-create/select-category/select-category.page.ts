import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-select-category',
    templateUrl: './select-category.page.html',
    styleUrls: ['./select-category.page.scss'],
})
export class SelectCategoryPage implements OnInit {
    categoryType: string = null;
    title: string = 'Выберите раздел';
    items: any = null;

    constructor(private route: ActivatedRoute, private api: ApiService, private nav: NavController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.route.snapshot.paramMap.get('categoryType') !== undefined) {
            this.categoryType = this.route.snapshot.paramMap.get('categoryType');

            this.api._get('categories', new HttpParams(), new HttpHeaders()).toPromise()
                .then(data => {
                    for (let i in data['result']) {
                        if (data['result'][i]['code'] == this.categoryType) {
                            this.items = data['result'][i]['subCategories'];
                            break;
                        }
                    }
                })
                .catch(err => {
                });
        }
    }

    ionViewWillLeave() {
        this.items = null;
    }

    next(categoryType: string, categoryId: number) {
        this.nav.navigateForward(`/private/task-create/select-city/${categoryType}/${categoryId}`);
    }
}
