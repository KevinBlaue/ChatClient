import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {SocketMessageEnum} from '../enums/SocketMessageEnum';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppSocketService {
    private url = 'http://localhost:3000';
    public socket;

    constructor() {
        this.socket = io(this.url);
    }

    public send(msg: SocketMessageEnum, load: any = null, to: any = null) {
        console.log('OUT', msg);
        this.socket.emit('message', {
            command: msg,
            data: load,
            receiver: to
        });
    }

    public receive() {
        return new Observable((observer) => {
            this.socket.on('socketinfo', (message) => {
                observer.next(message);
            });
        });
    }
}
