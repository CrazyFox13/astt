import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-moderation',
    templateUrl: './moderation.page.html',
    styleUrls: ['./moderation.page.scss'],
})
export class ModerationPage implements OnInit {
    constructor(private nav: NavController) {
    }

    ngOnInit() {
    }

    redirect() {
        this.nav.navigateForward(`/private/tasks`);
    }
}
