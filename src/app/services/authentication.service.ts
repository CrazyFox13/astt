import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {Platform} from "@ionic/angular";


@Injectable()
export class AuthenticationService {
    authState = new BehaviorSubject(false);

    constructor(private router: Router, private storage: Storage, private platform: Platform,) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }

    ifLoggedIn() {
        this.storage.get('key').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }

    login(key: string) {
        this.storage.set('key', key).then((response) => {
            this.authState.next(true);
        });
    }

    logout() {
        this.storage.remove('key').then(() => {
            this.router.navigate(['home']);
            this.authState.next(false);
        });
    }

    isAuthenticated() {
        return this.authState.value;
    }
}