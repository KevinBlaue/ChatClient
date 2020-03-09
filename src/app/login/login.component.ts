import {Component, OnInit, ViewChild} from '@angular/core';
import {Login} from '../classes/Login';
import {AppSocketService} from '../service/app.socket.service';
import {SocketMessageEnum} from '../enums/SocketMessageEnum';
import {SocketInfoEnum} from '../enums/SocketInfoEnum';
import {Router} from '@angular/router';
import {SocketInfo} from '../classes/SocketInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form', {static: true}) form;

  model: Login = new Login();
  infoState: string;

  constructor(private socket: AppSocketService, private router: Router) { }

  ngOnInit() {
    this.socket.receive().subscribe((msg: SocketInfo) => {
      console.log('IN -->', msg);
      if (msg.command === SocketInfoEnum.LOGIN_SUCCESS) {
        this.router.navigate(['/chat']);
      } else if (msg.command === SocketInfoEnum.LOGIN_FALSE) {
        this.infoState = msg.data.info;
      }
    });
  }

  login() {
    this.socket.send(SocketMessageEnum.LOGIN, {
      username: this.model.username,
      password: this.model.passwort
    });
  }

}
