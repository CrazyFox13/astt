import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Storage} from "@ionic/storage";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private storage: Storage) {
    }

    canActivate(): Promise<boolean> {
        return this.storage.get('key')
            .then(value => value != null)
    }
}
