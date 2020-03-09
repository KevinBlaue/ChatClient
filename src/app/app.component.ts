import {Component, OnInit} from '@angular/core';
import {User} from './classes/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatapp';

  ngOnInit(): void {}
}
