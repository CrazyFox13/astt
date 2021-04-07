import {Component, Input, OnInit} from '@angular/core';
import {API_URL} from "../../../../../environments/environment";

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
    @Input() files: null;
    url: string;

    constructor() {
        this.url = API_URL;
    }

    ngOnInit() {
    }

}
