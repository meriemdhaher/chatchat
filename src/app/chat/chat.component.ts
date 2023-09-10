import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';
import { Message } from '../message.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  
})


export class ChatComponent implements OnInit {
  
  readonly choiceBtn: Map<string, string> = new Map([
    ['AA', 'Je souhaite publier une mission'],
    ['BB', "J ai un probleme!"],
    ['CC', "je veux m inscrire"],
    ['DD', "J'ai un probleme!"]
  ])
  readonly ENTREPRISE = 'entreprise';
  readonly ASSOCIATION = 'association';
  isActivateChat: boolean = false;
  isLoading: boolean = false;
  isAssociation: boolean = true;
  condition: boolean = false;
  messages: Message[] = [];
  value = '';
  contextGlobal: string = '';
  message: any;
botResponses:[] | undefined;
  chatContainerRef: any;
  isChatOpen: boolean | undefined;
  userInput: string = '';

  constructor(public chatService: ChatService) { }


  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      console.log('val ', val)
    this.messages = this.messages.concat(val);
    this.chatService.isLoading.subscribe((loadingFlag) => {
      this.isLoading = loadingFlag;

    })
  });
}
toggleChat() {
  // Inversez l'état du chat
  this.isChatOpen = !this.isChatOpen;
  const chatContainer = this.chatContainerRef?.nativeElement;
  if (chatContainer) {
    if (this.isChatOpen) {
      chatContainer.classList.remove('chat-closed');
    } else {
      chatContainer.classList.add('chat-closed');
    }
  }
}


minimizeChat() {
  const chatContainer = document.getElementById('chatContainer');
  if (chatContainer) {
    chatContainer.classList.toggle('chat-closed');
    this.isChatOpen = false;
  }
}

  openChatBot(): void { 
    this.isActivateChat =! this.isActivateChat;
  }
  

  sendMessage(): void {
    if (this.userInput) {
      this.messages.push({ author: 'user', content: this.userInput, context: this.contextGlobal});
      this.chatService.getBotAnswer(this.value, this.contextGlobal);

    if(this.value !== '') {

      this.value = '';
      this.userInput = ''; // Effacez l'input box après l'envoi.
    }
  }
  }

  clickEvent(event: string) {
     (event === 'ASSOCIATION' || event === 'ENTREPRISE')
      ? this.contextGlobal = event
      : this.contextGlobal;
      console.log('conetxGlobal ', event)
    this.chatService.getBotAnswer(event.toUpperCase(), this.contextGlobal);
  }
  
}
