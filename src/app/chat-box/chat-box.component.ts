import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {

  isUserTyping = false;
  subs: Subscription;
  constructor(private stompService: StompService) { }

  ngOnInit() {
    this.subs = this.stompService.subscribe('/topic/userupdates').subscribe((data) => {
      this.isUserTyping = !isNullOrUndefined(data);
      console.log('User is typing...', data);
    });
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
