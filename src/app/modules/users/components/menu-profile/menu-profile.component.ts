import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {MenuController, NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-menu-profile',
    templateUrl: './menu-profile.component.html',
    styleUrls: ['./menu-profile.component.scss'],
})
export class MenuProfileComponent implements OnInit {
    @Input() isAuthorized: boolean;
    @Input() user: any;

    constructor(private api: ApiService, private menu: MenuController, private nav: NavController, private storage: Storage) {
    }

    ngOnInit() {
    }

    redirect(to: string) {
        this.menu.close();
        this.nav.navigateForward('/' + to);
    }

    async logout() {
        await this.storage.remove('key');
        await this.menu.close();
        this.api.changeAuthState(false);
        this.api.removeUser();
        this.api.changeApiKey(null);
        this.nav.navigateRoot('/public/home');
    }
}
