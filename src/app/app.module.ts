import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { ChatBoxComponent } from './chat-box/chat-box.component';

const stompConfig: StompConfig = {
  // added '/websocket' for spring boot SockJS
  url: 'ws://127.0.0.1:8080/shubh-chat-app/websocket',
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0,
  heartbeat_out: 20000, // 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};




@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
