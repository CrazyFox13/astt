import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavController} from "@ionic/angular";
import {SocketIoService} from "../../../../services/socket-io.service";
import {TaskItem} from "../../../../interfaces/task-item";

@Component({
    selector: 'app-task-items-list',
    templateUrl: './task-items-list.component.html',
    styleUrls: ['./task-items-list.component.scss'],
})
export class TaskItemsListComponent implements OnInit {
    @Input() items: TaskItem[] = [];
    @Input() statuses: any = null;
    @Input() blockedUsers: any = [];

    constructor(private nav: NavController, private socket: SocketIoService) {
    }

    ngOnInit() {
    }

    detail(id: any, itemCode: any, categoryCode: any, categoryType: any) {
        this.nav.navigateForward(`/public/tasks/${id}/${categoryType}/${categoryCode}/${itemCode}`);
    }
}
