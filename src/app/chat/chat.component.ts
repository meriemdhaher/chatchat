import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';
import { Message } from '../message.model';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  
})


export class ChatComponent implements OnInit {
  
  readonly ENTREPRISE_LABEL = 'entreprise';
  readonly ASSOCIATION_LABEL = 'association';
  isActivateChat: boolean = false;
  isLoading: boolean = false;
  messages: Message[] = [];
  value = '';
  

  constructor(public chatService: ChatService) { }


  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
    this.messages = this.messages.concat(val);
    this.chatService.isLoading.subscribe((loadingFlag) => {
      this.isLoading = loadingFlag;
    })
  });
}

  openChatBot(): void { 
    this.isActivateChat =! this.isActivateChat;
  }

  sendMessage(): void {
    if(this.value !== '') {
      this.chatService.getBotAnswer(this.value);
      this.value = '';
    }
  }

  clickEvent(event: string) {
    this.chatService.getBotAnswer(event.toUpperCase());
    }
  
}