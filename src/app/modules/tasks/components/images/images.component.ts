import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";
import {API_URL} from "../../../../../environments/environment";

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, OnChanges {
    @Input() images: any = null;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor() {
    }

    ngOnInit(): void {
        this.galleryOptions = [
            {
                "width": "100%",
                "image": false,
                "thumbnailsRemainingCount": true,
                "height": "90px",
                "previewCloseOnClick": true,
                "previewSwipe": true,
                "imageAnimation": NgxGalleryAnimation.Slide,
                "imageInfinityMove": true,
                "thumbnailsColumns": 4
            }
        ];

        this.galleryImages = [];
    }

    ngOnChanges(): void {
        if (this.images !== null && this.images !== undefined && !this.galleryImages.length) {
            for (let i in this.images) {
                this.galleryImages.push(
                    {
                        small: API_URL + this.images[i]['thumb'],
                        medium: API_URL + this.images[i]['src'],
                        big: API_URL + this.images[i]['src']
                    }
                );
            }
        }
    }

    detail(src: string) {
        console.log(src);
    }
}
