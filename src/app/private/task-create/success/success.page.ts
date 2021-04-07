import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-success',
    templateUrl: './success.page.html',
    styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
    constructor(private nav: NavController) {
    }

    ngOnInit() {
    }

    redirect() {
        this.nav.navigateForward(`/private/tasks`);
    }
}
