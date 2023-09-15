import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat-service.service';
import { Message } from '../message.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  
})


export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainerRef: ElementRef | undefined;
  isChatOpen: boolean = false; // Ajoutez cette variable


  
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
  botResponses: Message[] | undefined;
  userInput: string = '';
  messageMap: any;
  combinedMessages: any[] = [];
  chatDisplay: any;
  chatInput:any;



  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.isChatOpen = !this.isChatOpen;
    this.chatService.conversation.subscribe((val) => {
      console.log('val ', val)
      this.messages = this.messages.concat(val.map(message => ({
        ...message,
        contextGlobal: message.contextGlobal || 'valeur par défaut'
      })));    this.chatService.isLoading.subscribe((loadingFlag) => {
      this.isLoading = loadingFlag;

    })
  });
}
toggleChat() {
  this.isChatOpen = !this.isChatOpen;
  const chatContainer = this.chatContainerRef?.nativeElement;
  if (chatContainer) {
    if (this.isChatOpen) {
      chatContainer.classList.remove('chat-closed');
      chatContainer.classList.add('chat-open');
    } else {
      chatContainer.classList.add('chat-closed');
      chatContainer.classList.remove('chat-open');
    }
  }
}


minimizeChat() {
  this.isChatOpen = !this.isChatOpen;
}

openChatBot(): void { 
  console.log('Ouverture de la discussion');
  this.isActivateChat = !this.isActivateChat;
}

  sendMessage(): void {
    if (this.userInput) {
      const userMessage = new Message('user', this.userInput, this.contextGlobal);
      this.messages.push({
        author: 'user', content: this.userInput, context: this.contextGlobal,
        contextGlobal: undefined
        
      });
      this.chatService.getBotAnswer(this.value, this.contextGlobal);

    if(this.value !== '') {

      this.value = '';
      this.userInput = ''; // Effacez l'input box après l'envoi.
    }
  }
  }

  clickEvent(event: string) {
    // Fermez d'abord la discussion avant de changer de contexte
    this.minimizeChat();
  
    if (event === 'ASSOCIATION' || event === 'ENTREPRISE') {
      this.contextGlobal = event;
    }
  
    console.log('contextGlobal ', this.contextGlobal);
    this.chatService.getBotAnswer(event.toUpperCase(), this.contextGlobal);
  }
  handleClick() {
    // Code du gestionnaire de clic ici
    // Par exemple, ouvrir le chat, afficher les boutons de choix, etc.
    this.initChat();
  }

  // Fonction pour envoyer un choix
  sendChoice(choice: string) {
    // Code pour envoyer un choix
    // Par exemple, envoyer le choix au serveur via une requête HTTP
    // et gérer la réponse du serveur
    // Après avoir géré la réponse, vous pouvez appeler endChat() pour terminer la conversation
    this.endChat();
  }

  // Gestionnaire d'événement pour initialiser la conversation
  initChat() {
    // Code pour initialiser la conversation
    // Par exemple, afficher un message de bienvenue initial
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('message', 'welcome');
    welcomeMessage.innerHTML = `
      <span class="message-content">Bonjour 🖐 Merci pour votre visite !
        Comment notre équipe peut-elle vous aider ?
        Vous êtes ?</span>
    `;
    this.chatDisplay.nativeElement.appendChild(welcomeMessage);
  }

  // Gestionnaire d'événement pour terminer la conversation
   endChat() {
    // Vérifie si minimizeButton existe avant de le manipuler
    const minimizeButton = document.getElementById('minimize-button');
    if (minimizeButton) {
        minimizeButton.style.display = 'none';
    }

    // Vérifie si endNotification existe avant de le manipuler
    const endNotification = document.getElementById('end-chat-notification');
    if (endNotification) {
        endNotification.style.display = 'block';
    }

    // Vérifie si restartChatLink existe avant d'ajouter un gestionnaire d'événement
    const restartChatLink = document.getElementById('restart-chat-link');
    if (restartChatLink) {
        restartChatLink.addEventListener('click', () => {
            // Réinitialise la conversation en supprimant le message "Chat terminé"
            if (endNotification) {
                endNotification.style.display = 'none';
            }

            // Réactiver la saisie de l'utilisateur
            if (this.chatInput) {
                this.chatInput.disabled = false;
            }

            // Afficher à nouveau le bouton de minimisation du chat
            if (minimizeButton) {
                minimizeButton.style.display = 'block';
            }

            // Réinitialiser la conversation en appelant initChat()
            initChat();
        });
    }
}
}
function initChat() {
  throw new Error('Function not implemented.');
}

