import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ApiService} from "./services/api.service";
import {IonicStorageModule} from "@ionic/storage";

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {AuthenticationService} from "./services/authentication.service";

import {NgxGalleryModule} from 'ngx-gallery';
import {MenuProfileComponent} from "./modules/users/components/menu-profile/menu-profile.component";
import {PushService} from "./services/push.service";
import {SocketIoService} from "./services/socket-io.service";
import {CHAT_URL} from "../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";

import {NgxMaskModule} from 'ngx-mask';

const config: SocketIoConfig = {url: CHAT_URL, options: {}};

@NgModule({
    declarations: [AppComponent, MenuProfileComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot({
            name: '__configDb',
            driverOrder: ['sqlite', 'indexeddb', 'websql']
        }),
        SocketIoModule.forRoot(config),
        NgxGalleryModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ApiService,
        AuthenticationService,
        PushService,
        SocketIoService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
