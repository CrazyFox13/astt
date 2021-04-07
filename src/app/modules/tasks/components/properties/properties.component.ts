import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
    @Input() properties: null;

    constructor() {
    }

    ngOnInit() {
    }

}
