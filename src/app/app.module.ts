import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppSocketService } from './service/app.socket.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app.material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    PagenotfoundComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      AppMaterialModule,
  ],
  providers: [AppSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
