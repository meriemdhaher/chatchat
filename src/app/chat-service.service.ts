import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, Subject } from "rxjs";

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'

})

export class ChatService {
  conversation = new Subject<Message[]>();
  
  // TODO : create ClietHttp service to consule back response
  messageMap: any = {
    "Hi": "Hello",
    "ASSOCIATION": "Welcome to the Association section",
    "ENTREPRISE":"Welcome to the entreprise section",
    "Who are you": "I'm RSE TIME Bot",
    "What is RSE": "Corporate Social Responsibility (CSR) / Responsabilité Sociale des Entreprises (RSE): This is a business approach that aims to contribute positively to society and the environment. It involves companies taking responsibility for their impact on various aspects of society, including economic, social, and environmental aspects. CSR or RSE initiatives might include ethical business practices, sustainability efforts, community engagement, and more.",
    "Tell me more about your platform and your interests.": "We are a platform that connects associations and businesses. We have 17 axes.",
    "More": "To learn more details, we will connect you with one of our experts. Please send us your email for us to contact you as soon as possible.",
    "default": "I can't understand. We will connect you with an expert from the team."
    
  }

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string) {
    // TODO : replace it with server values 
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }


  // TODO: to add it innside the appropiete tags
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  playFile() {
    this.audioFile.play();
  }

}
