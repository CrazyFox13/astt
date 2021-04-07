import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-stages',
    templateUrl: './stages.component.html',
    styleUrls: ['./stages.component.scss'],
})
export class StagesComponent implements OnInit {
    @Input() stages: null;

    constructor() {
    }

    ngOnInit() {
    }

}
