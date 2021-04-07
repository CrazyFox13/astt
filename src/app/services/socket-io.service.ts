import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    _userStatuses = new BehaviorSubject(null);
    usersStatuses = this._userStatuses.asObservable();
    _unread = new BehaviorSubject(0);
    unread = this._unread.asObservable();
    _roomId = new BehaviorSubject(null);
    roomId = this._roomId.asObservable();
    _unreadRooms = new BehaviorSubject(null);
    unreadRooms = this._unreadRooms.asObservable();
    _taskId = new BehaviorSubject(0);
    taskId = this._taskId.asObservable();

    constructor(private socket: Socket) {
    }

    getInstance() {
        return this.socket;
    }

    putUsers(ids: any) {
        let put = [];
        let values__ = this._userStatuses.getValue();

        for (let i in ids) {
            let f = false;
            for (let i in values__) {
                put[i] = values__[i];
                if (i == ids[i]) {
                    f = true;
                }
            }

            if (!f) {
                put[ids[i]] = 'offline';
            }

            this.socket.on(ids[i] + ' user status', (data) => {
                let values = this._userStatuses.getValue();
                let f = false;
                for (let i in values) {
                    if (i == data['id']) {
                        values[i] = data['status'];
                        this._userStatuses.next(values);
                        break;
                    }
                }
            });
        }

        this._userStatuses.next(put);

        for (let i in ids) {
            this.socket.emit('status', ids[i]);
        }
    }

    removeUsersStatuses() {
        let values = this._userStatuses.getValue();
        for (let i in values) {
            this.socket.removeListener(i + ' user status', (data) => {
                console.log(i + ' removed');
            });
        }

        this._userStatuses.next([]);
    }

    login(id: string) {
        this.socket.emit('add user', id);
        this.socket.on(id + ' new message', (data) => {
            if (this._roomId.getValue() == null) {
                this.unreadIncrement();
                this.putUnread(data['roomId']);
            } else {
                if (data['roomId'] !== this._roomId.getValue()) {
                    this.unreadIncrement();
                    this.putUnread(data['roomId']);
                }
            }
            console.log(data);
        });
    }

    logout(id: string) {
        this.unSetRoomId();
        this._unread.next(0);
        this._userStatuses.next(null);
        this._unreadRooms.next(null);
        this.socket.removeListener(id + ' new message', (data) => {
        });
    }

    close() {
        this.socket.disconnect();
    }

    setRoomId(id: string, taskId: number) {
        this._roomId.next(id);
        this._taskId.next(taskId);
    }

    unSetRoomId() {
        this._roomId.next(null);
        this._taskId.next(0);
    }

    putUnread(id: string, qty?: number) {
        let put = [];
        let values__ = this._unreadRooms.getValue();

        if (values__ !== null) {
            let f = false;
            for (let i in values__) {
                if (i == id) {
                    put[id] = (qty !== null && qty !== undefined) ? qty : (values__[i] + 1);
                    f = true;
                } else {
                    put[i] = (qty !== null && qty !== undefined) ? qty : values__[i];
                }
            }

            if (!f) {
                put[id] = (qty !== null && qty !== undefined) ? qty : 1;
            }
        } else {
            put[id] = (qty !== null && qty !== undefined) ? qty : 1;
        }

        this._unreadRooms.next(put);
    }

    removeUnread(id: string) {
        let values__ = this._unreadRooms.getValue();
        if (values__ !== null) {
            let put = [];
            let f = false;
            for (let i in values__) {
                if (i == id) {
                    put[i] = 0;
                    this.unreadDecrement(values__[i]);
                } else {
                    put[i] = values__[i];
                }
            }

            this._unreadRooms.next(put);
        }
    }

    setUnread(qty: number) {
        this._unread.next(qty);
    }

    unreadIncrement() {
        this._unread.next((this._unread.getValue() + 1));
    }

    unreadDecrement(qty?: number) {
        if (this._unread.getValue() > 0) {
            if (qty !== null && qty !== undefined) {
                if (this._unread.getValue() >= qty) {
                    this._unread.next((this._unread.getValue() - qty));
                } else {
                    this._unread.next(0);
                }
            } else {
                this._unread.next((this._unread.getValue() - 1));
            }
        }
    }
}
