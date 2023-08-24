import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import ChatComponent from '../chat-service.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // Vous pouvez ajuster les styles
  
  
  
})


export class ChatComponent implements OnInit {
  userInput: string = '';
  chatContainerOpen: boolean = false;
  @ViewChild('chatDisplay') chatDisplayRef!: ElementRef;
  @ViewChild('userInput') userInputRef!: ElementRef;
message: any;

  
  // Vous pouvez ajouter des propriétés ou des méthodes nécessaires ici
  // Gestionnaire d'événement pour le bouton "Entreprise"
  onEntrepriseButtonClick() { 
    // Implémentez la logique de traitement ici
  }

  // Gestionnaire d'événement pour le bouton "Association"
  onAssociationButtonClick() {
    // Implémentez la logique de traitement ici
  }

  // Gestionnaire d'événement pour le bouton "Send"
  onSendButtonClick() {
    // Implémentez la logique d'envoi du message ici
  }
  // Propriétés pour les styles de bouton
  gradientStyle = 'linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255))';
  boxShadowStyle = 'rgba(0, 77, 255, 0.5) 0px 4px 24px';

  userId = 'votre-id-utilisateur'; // Remplacez par la valeur réelle

  ngOnInit() {
    // Vous pouvez initialiser d'autres choses ici
  }

  appendMessage(sender: string, message: string) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    this.chatDisplayRef.nativeElement.appendChild(messageElement);
    this.chatDisplayRef.nativeElement.scrollTop = this.chatDisplayRef.nativeElement.scrollHeight;
    setTimeout(() => {
      messageElement.classList.add('show');
    }, 10);
  }

 
  getBotResponse(userInput: string) {
    // Implémentez ici la logique pour envoyer la demande au serveur et gérer la réponse du bot
  }
  // Autres propriétés
  
  // ...

  toggleChatContainer() {
    this.chatContainerOpen = !this.chatContainerOpen;
  }

  // Autres méthodes

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Implémentez la logique pour envoyer le message à bot
    }
  }


  // ...
  

    async sendUserMessage(message: string){
    
    const userInput = this.userInputRef.nativeElement.value;

    // Envoi de la requête au serveur
   

    this.userInputRef.nativeElement.value = ''; // Réinitialisation de l'input
  }

  addMessageToChat(message: string, sender: string) {
    // Implémentez la logique pour ajouter un message au chat
  }

  
  //L'icon de l'envoie 
  // appel dans HTML avec imagePath 
  imagePath = 'assets/send-icon.png'; 

}
