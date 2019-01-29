import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Websocket demo';
  private subs: Subscription;

  constructor(private stompService: StompService) { }

  ngOnInit() {
    this.subs = this.stompService.subscribe('/chat').subscribe((data) => {
      console.log('subscribed to chat..', data);
    });
  }

  sendMessage() {
    const outGoingMessage = JSON.stringify({ message: 'Hello from the shubh client' });
    this.stompService.publish('/app/send/message', outGoingMessage);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
