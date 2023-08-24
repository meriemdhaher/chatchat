import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';
import { Message } from '../message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {
  
  isActivateChat: boolean = false;
  messages: Message[] = [];
  value = '';

  constructor(public chatService: ChatService) { }


  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
    this.messages = this.messages.concat(val);
  });
}

  openChatBot(): void {
    this.isActivateChat =! this.isActivateChat;
  }

  sendMessage(): void {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }
}