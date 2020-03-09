import {OnInit} from '@angular/core';
import {AppSocketService} from './app.socket.service';
import {SocketInfo} from '../classes/SocketInfo';
import {SocketInfoEnum} from '../enums/SocketInfoEnum';
import {Router} from '@angular/router';

export class ReceiverService implements OnInit {

  messages: string[] = [];
  infoState;

  constructor(private socket: AppSocketService, private router: Router) {}

  ngOnInit(): void {
    this.socket.receive().subscribe((msg: SocketInfo) => {
      console.log('IN -->', msg);
      if (msg.command === SocketInfoEnum.LOGIN_SUCCESS) {
        this.router.navigate(['/chat']);
      } else if (msg.command === SocketInfoEnum.LOGIN_FALSE) {
        this.infoState = msg.data.info;
      }
    });
  }

  getMessage() {
    this.socket.receive().subscribe((socketinfo: SocketInfo) => {
      this.process(socketinfo);
    });
  }

  process(socketinfo: SocketInfo) {
    console.log('IN -->', socketinfo);
    switch (socketinfo.command) {
      case SocketInfoEnum.NEW_MESSAGE:
        this.messages.push(socketinfo.data.message);
        break;
    }
  }


}
