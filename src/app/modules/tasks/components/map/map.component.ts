import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import ymaps from 'ymaps';
import {YANDEX_MAPS_KEY} from "../../../../../environments/environment";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
    @Input() route: any = null;
    @Input() lat: number = 0;
    @Input() long: number = 0;

    constructor() {
    }

    ngOnChanges() {
        if (this.route !== null) {
            ymaps.load('https://api-maps.yandex.ru/2.1.17/?load=package.full&lang=ru_RU&apikey=' + YANDEX_MAPS_KEY).then(maps => {
                const map = new maps.Map('map', {
                    center: [55.752554272581875, 37.61941593484034],
                    zoom: 12,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                const multiRoute = new maps.multiRouter.MultiRoute({
                    referencePoints: this.route
                }, {
                    boundsAutoApply: true
                });

                map.geoObjects.add(multiRoute);
            });
        }

        if (this.lat !== 0 && this.long !== 0) {
            ymaps.load('https://api-maps.yandex.ru/2.1.17/?load=package.full&lang=ru_RU&apikey=' + YANDEX_MAPS_KEY).then(maps => {
                const map = new maps.Map('map', {
                    center: [this.lat, this.long],
                    zoom: 12,
                    controls: ['zoomControl', 'fullscreenControl']
                });
            });
        }
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
