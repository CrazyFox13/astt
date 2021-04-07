import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {City} from "../../../interfaces/city";

@Component({
    selector: 'app-select-city',
    templateUrl: './select-city.page.html',
    styleUrls: ['./select-city.page.scss'],
})
export class SelectCityPage implements OnInit {
    categoryType: string = null;
    categoryId: number = 0;
    title: string = 'Выберите город';
    items: City[] = [];
    search: string = '';

    constructor(private route: ActivatedRoute, private api: ApiService, private nav: NavController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.route.snapshot.paramMap.get('categoryType') !== undefined
            && this.route.snapshot.paramMap.get('categoryId') !== undefined) {
            this.categoryType = this.route.snapshot.paramMap.get('categoryType');
            this.categoryId = parseInt(this.route.snapshot.paramMap.get('categoryId'));

            this.api._get('cities', new HttpParams(), new HttpHeaders()).toPromise()
                .then(data => {
                    this.items = data['result'];
                })
                .catch(err => {
                });
        }
    }

    ionViewWillLeave() {
        this.items = null;
    }

    next(categoryType: string, categoryId: number, cityId: number) {
        this.nav.navigateForward(`/private/task-create/make/${categoryType}/${categoryId}/${cityId}`);
    }
}
