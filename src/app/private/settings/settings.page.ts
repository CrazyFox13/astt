import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    title: string = 'Настройки аккаунта';
    userForm: any;
    isChangePassword: boolean = false;
    user: any = null;
    apiKey: string = null;

    constructor(private api: ApiService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])),
            lastName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])),
            password: new FormControl()
        });
    }

    async takePicture() {
        const image = await Plugins.Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });

        this.upload(image.dataUrl);
    }

    ngOnInit() {
        this.api.user.subscribe(user => this.user = user);
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
    }

    ionViewWillLeave() {
        this.isChangePassword = false;
    }

    passwordChange() {
        this.isChangePassword = true;
    }

    submit(userForm: any) {
        if (this.user !== null && this.apiKey !== null) {
            this.api._post('updateuser', userForm['value'], new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    this.api.getUser(this.apiKey);
                })
                .catch(err => {
                });
        }
    }

    private upload(base64: string) {
        if (this.user !== null && this.apiKey !== null) {
            this.api._post('updateuser', {photo: base64}, new HttpHeaders({"X-PI-KEY": this.apiKey})).toPromise()
                .then(data => {
                    this.api.getUser(this.apiKey);
                })
                .catch(err => {
                });
        }
    }
}
