import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {API_URL} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {SocketIoService} from "./socket-io.service";

@Injectable()
export class ApiService {
    _isAuthorized = new BehaviorSubject(false);
    isAuthorized = this._isAuthorized.asObservable();
    _apiKey = new BehaviorSubject(null);
    apiKey = this._apiKey.asObservable();
    _user = new BehaviorSubject(null);
    user = this._user.asObservable();

    params: any = [];
    baseUrl: string = API_URL + '/api/v1';

    constructor(public httpClient: HttpClient, private storage: Storage, private socket: SocketIoService) {
    }

    async initKey() {
        return await this.storage.get('key').then((val) => {
            if (val !== null) {
                this.changeApiKey(val);
                this.changeAuthState(true);
            }
            return val;
        });
    }

    _get(method: string, params: HttpParams, headers: HttpHeaders) {
        return this.httpClient.get(this.baseUrl + '/' + method + '/' + ((params.toString().length) ? '?' + params.toString() : ''), {headers: headers});
    }

    _post(method: string, body: any, headers: HttpHeaders) {
        return this.httpClient.post(this.baseUrl + '/' + method + '/', body, {headers: headers});
    }

    getUser(key: string) {
        this._get('user', new HttpParams(), new HttpHeaders({'X-PI-KEY': key})).toPromise()
            .then(data => {
                if (!data['errorCode']) {
                    this.socket.setUnread(data['result']['unread']['total']);
                    if (data['result']['unread']['rooms'] !== null) {
                        for (let i in data['result']['unread']['rooms']) {
                            this.socket.putUnread(i, data['result']['unread']['rooms'][i]);
                        }
                    }

                    this.socket.login(data['result']['c']);
                    if (data['result']['photo'] !== null) {
                        data['result']['photo'] = API_URL + data['result']['photo']['src'];
                    }
                    this._user.next(data['result']);
                } else {
                    this._user.next(null);
                }
            })
            .catch(err => {
                this._user.next(null);
            });
    }

    removeUser() {
        let u = this._user.getValue();
        this.socket.logout(u['c']);
        this._user.next(null);
    }

    changeAuthState(state: boolean) {
        this._isAuthorized.next(state);
    }

    changeApiKey(value: string) {
        this._apiKey.next(value);
    }
}
