import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../classes/User';
import {SocketInfoEnum} from '../enums/SocketInfoEnum';
import {SocketInfo} from '../classes/SocketInfo';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ChatUser} from '../classes/ChatUser';
import {ChatMessage} from '../classes/ChatMessage';
import {AppSocketService} from '../service/app.socket.service';
import {SocketMessageEnum} from '../enums/SocketMessageEnum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, null) viewport: CdkVirtualScrollViewport;
  title = 'chatapp';
  user: User;
  username: string;
  message: string;
  messages: ChatMessage[] = [];
  exists = false;
  users: ChatUser[] = [];
  selected;
  service: AppSocketService;

  ngOnInit() {}

  createUser() {
    this.service = new AppSocketService();
    this.service.socket.emit('name', this.username);

    this.service.receive().subscribe((socketinfo: SocketInfo) => {
         this.process(socketinfo);
        });
    this.exists = true;
  }

  sendMessage() {
    const msg = new ChatMessage();
    msg.content = this.message;
    const index = this.users.map(e => {
      return e.id;
    }).indexOf(this.user.socketId);
    msg.from = this.users[index];
    msg.timestamp = Date.now();
    this.service.send(SocketMessageEnum.MESSAGE, msg, this.selected);
    this.messages.push(msg);
    this.message = null;
    this.gotoLastIndex();
  }

  process(socketinfo: SocketInfo) {
    console.log('IN -->', socketinfo);
    switch (socketinfo.command) {

      case SocketInfoEnum.NEW_MESSAGE:
        this.messages.push(socketinfo.data);
        this.gotoLastIndex();
        console.log(socketinfo.data.from.name);
        break;

      case SocketInfoEnum.USER_LIST:
        this.empty(this.users);
        socketinfo.data.forEach(u => {
          const nUser = new ChatUser();
          nUser.name = u.name;
          nUser.id = u.id;
          this.users.push(nUser);
        });
        break;

      case SocketInfoEnum.NEW_USER:
        this.user = new User();
        this.user.name = socketinfo.data.name;
        this.user.socketId = socketinfo.data.id;
        break;
    }
  }

  gotoLastIndex() {
    setTimeout(() => {
      this.viewport.scrollToIndex(99999);
    });
  }

  empty(list: any[]) {
    list.length = 0;
  }
}
