import {Component, Input, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {API_URL} from "../../../../../environments/environment";

@Component({
    selector: 'app-user-public-info',
    templateUrl: './user-public-info.component.html',
    styleUrls: ['./user-public-info.component.scss'],
})
export class UserPublicInfoComponent implements OnInit {
    @Input() user: any;
    @Input() statuses: any = null;
    url: string;

    constructor(private nav: NavController) {
        this.url = API_URL;
    }

    ngOnInit() {
    }

    userDetailPage(id: any) {
        this.nav.navigateForward(`/public/users/detail/${id}`);
    }
}
