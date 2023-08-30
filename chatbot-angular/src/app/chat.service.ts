import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(userInput: string, userId: string): Observable<any> {
    // Implement your logic to send the user input to the backend
    // and receive the bot's response
    const formData = new FormData();
    formData.append('user_input', userInput);
    formData.append('user_id', userId);

    return this.http.post('/getresponse', formData);
  }
}
