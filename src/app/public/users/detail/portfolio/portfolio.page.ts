import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";
import {API_URL} from "../../../../../environments/environment";
import 'hammerjs';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {SocketIoService} from "../../../../services/socket-io.service";

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.page.html',
    styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
    userId: number = 0;
    categoryId: number = 0;
    items: any = null;
    user: any = null;
    title: string = 'Выполненные заявки';
    usersStatuses: any = null;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private api: ApiService, private route: ActivatedRoute, private nav: NavController, private socket: SocketIoService) {
    }

    ngOnInit(): void {
        this.socket.usersStatuses.subscribe(usersStatuses => this.usersStatuses = usersStatuses);
        this.galleryOptions = [
            {
                "width": "100%",
                "thumbnailsColumns": 4,
                "thumbnailsRows": 1,
                "thumbnailsPercent": 25,
                "imagePercent": 75,
                "thumbnailMargin": 2,
                "thumbnailsMargin": 2,
                "imageSwipe": true,
                "previewCloseOnClick": true,
                "imageInfinityMove": true,
                "thumbnailsSwipe": true,
                "previewSwipe": true,
                "imageAnimation": NgxGalleryAnimation.Slide
            }
        ];

        this.galleryImages = [];
    }

    ngOnDestroy() {
    }

    ionViewWillEnter() {
        if (this.route.snapshot.paramMap.get('userId') !== undefined
            && this.route.snapshot.paramMap.get('categoryId') !== undefined) {
            this.userId = parseInt(this.route.snapshot.paramMap.get('userId'));
            this.categoryId = parseInt(this.route.snapshot.paramMap.get('categoryId'));

            if (this.userId > 0) {
                this.api._get('portfolioget',
                    new HttpParams().set('userId', this.userId.toString()).set('id', this.categoryId.toString()),
                    new HttpHeaders()).toPromise()
                    .then(data => {
                        if (!data['errorCode']) {
                            this.title = data['result']['name'];
                            this.user = data['result']['user'];
                            this.items = data['result']['files'];
                            this.socket.putUsers([this.user['c']]);

                            for (let i in data['result']['files']) {
                                this.galleryImages.push(
                                    {
                                        small: API_URL + data['result']['files'][i]['path'],
                                        medium: API_URL + data['result']['files'][i]['path'],
                                        big: API_URL + data['result']['files'][i]['path'],
                                        description: data['result']['files'][i]['description']
                                    }
                                );
                            }
                        }
                    })
                    .catch(err => {
                    });
            } else {
                this.nav.navigateRoot('/public/users');
            }
        }
    }

    ionViewWillLeave() {
        this.userId = null;
        this.items = null;
        this.socket.removeUsersStatuses();
    }
}
