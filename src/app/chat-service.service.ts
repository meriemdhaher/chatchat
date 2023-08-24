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

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  sendMessage(message: Message) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  
  //HTTPCLIENT METHOD 
  constructor(private http: HttpClient) {  
  }
  public getMessage(): Observable<string> {
    return new Observable(() => {
        'message btn rse';
    })
}
  

  conversation = new Subject<Message[]>();

  messageMap = {
    Hi: "Hello",
    "Who are you": "My name is RSE TIME Bot",
    "what is RSE": "La responsabilité sociétale des entreprises (RSE) or Corporate social responsibility or (CSR)",
    default: "I can't understand. Can you please repeat"
  };

  getBotAnswer(msg: string) {
    const userMessage = new Message("user", msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message("bot", this.getBotMessage(msg));

    setTimeout(() => {
      this.playFile();
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(msg: string): string {
    throw new Error("Method not implemented.");
  }

  playFile() {
    this.audioFile.play();
  }

}

export interface Message {
  text: string;
  side: string;
}
