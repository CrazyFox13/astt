import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Storage} from "@ionic/storage";
import {NavController} from "@ionic/angular";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {City} from "../../interfaces/city";

@Component({
    selector: 'app-cities',
    templateUrl: './cities.page.html',
    styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
    title: string = 'Выбор города';
    items: City[] = [];
    cityId: number = 0;
    search: string = '';

    constructor(private api: ApiService, private storage: Storage, public nav: NavController) {
    }

    ngOnInit() {
        this.storage.get('city')
            .then((cityId) => {
                this.cityId = cityId;
            })
            .catch(err => {
            });
        this.api._get('cities', new HttpParams(), new HttpHeaders()).toPromise()
            .then(data => {
                this.items = data['result'];
            })
            .catch(err => {
            });
    }

    changeCity(id: any) {
        for (let i in this.items) {
            if (this.items[i]['id'] == parseInt(id)) {
                this.storage.set('city', this.items[i]['id']);
                break;
            }
        }

        this.nav.navigateRoot('/public/home');
    }
}
