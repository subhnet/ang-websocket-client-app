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
  subs1: Subscription;
  subs2: Subscription;
  inputVal = '';

  otherUser = {
    userId: 0,
    firstName: '',
    lastName: '',
    shortName: '',
    userType: ''
  };

  currentUserContent = {
    senderId: '111',
    senderName: 'Rakesh',
    timestamp: new Date(),
    message: ''
  };

  loggedUser = {
    userId: 111,
    firstName: 'Rakesh',
    lastName: 'Maharana',
    shortName: 'Lipu',
    userType: ''
  };
  constructor(private stompService: StompService) { }

  ngOnInit() {
    this.subs1 = this.stompService.subscribe('/topic/userupdates').subscribe((data) => {
      this.isUserTyping = !isNullOrUndefined(data);
      this.otherUser = JSON.parse(data.body);
      console.log('User is typing...', data.body);
    });
    this.subs2 = this.stompService.subscribe('/topic').subscribe((data) => {
      console.log('subscribed to chat..', data);
    });
  }

  sendMessage() {
    this.currentUserContent.message = this.inputVal;
    console.log(JSON.stringify(this.currentUserContent));
    this.stompService.publish('/app/guestchat', JSON.stringify(this.currentUserContent));
  }

  sendTypingEvent() {
    console.log('sending typing event...');
    this.stompService.publish('/app/userupdates', JSON.stringify(this.loggedUser));
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
  }

}
