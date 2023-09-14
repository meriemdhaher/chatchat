import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export class Message {
  contextGlobal: any;
  constructor(public author: string, public content: string, public context: string) {}
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  conversation = new Subject<Message[]>();
  isLoading = new BehaviorSubject<boolean>(false);

  sendBotResponse(responseMessages: Message[]) {
    this.conversation.next(responseMessages);
  }

  
  // TODO : create ClietHttp service to consule back response


  
  messageMap: any = {
    "HI": "Hello!",
    "ASSOCIATION": 
      "Welcome to ASSOCIATION section, how can we assist you?.",
    //des boutons "j'ai un probleme", "je souhaite publier une mission" 
    // un message où se trouve un lien pour écrire ses cordonées  
    "ENTREPRISE": 
      "Welcome to ENTREPRISE section, how can we assist you?.",
    //des boutons "j'ai un probleme", "je souhaite publier une mission" 
    //  un message où se trouve un lien pour écrire ses cordonées  
    "JE SOUHAITE PUBLIER UNE MISSION": "Please fill out this form <a href='https://www.vermeg.com/fr/contactez-nous/'>here1</a>",
    "JE VEUX M INSCRIRE":"Please fill out this form <a href='https://www.vermeg.com/fr/contactez-nous/'>here2</a>",
    "J AI UN PROBLEME!":" We will connect you with an expert from the team.",
    "What is RSE?": "Corporate Social Responsibility (CSR) / Responsabilité Sociale des Entreprises (RSE): This is a business approach that aims to contribute positively to society and the environment. It involves companies taking responsibility for their impact on various aspects of society, including economic, social, and environmental aspects. CSR or RSE initiatives might include ethical business practices, sustainability efforts, community engagement, and more.",
    "Tell me more about your platform and your interests.": "We are a platform that connects associations and businesses. We have 17 axes.",
    "More": "To learn more details, we will connect you with one of our experts. Please send us your email for us to contact you as soon as possible.",
    "default": "I can't understand. We will connect you with an expert from the team."
  }
  botResponses: string[] = [];

// Lorsque l'utilisateur clique sur le bouton "ASSOCIATION"
clickEventAssociation() {
  this.botResponses = [
    "Thank you for your response, how can we assist you?",
    //"Can you give us your Contact details so we can connect you with one of our experts. You can provide your details <a href='#'>ici/here</a>"
  ];
}

// Lorsque l'utilisateur clique sur le bouton "ENTREPRISE"
clickEventEntreprise() {
  this.botResponses = [
    "Thank you for your response, how can we assist you?",
    //"Can you give us your Contact details so we can connect you with one of our experts. You can provide your details <a href='#'>ici/here</a>"
  ];
}

getBotAnswer(msg: string, context: string) {
  console.log('MSG : ', msg)
  this.isLoading.next(true);
  const userMessage = new Message('user', msg, context);  
  this.conversation.next([userMessage]);
  const botMessage = new Message('bot', this.getBotMessage(msg), context);

    setTimeout(() => { 
      this.conversation.next([botMessage]);
      this.isLoading.next(false);
    }, 1500);
  }

 getBotMessage(question: string) {
    // TODO : replace it with server values 
    console.log('$$$', question)
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }

  // TODO: to add it innside the appropiete tags

  playFile() {
    this.audioFile.play();
    
  }
  
  
}
