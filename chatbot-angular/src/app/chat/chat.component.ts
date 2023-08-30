import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userId = '123'; // Replace with the actual user ID
  userInputElementValue = '';
  messages: any[] = []; // You can use 'any' type temporarily

  @ViewChild('chatDisplay') chatDisplay!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage(userInput: string): void {
    if (userInput.trim() === '') {
      return;
    }

    // Call the service to send the message
    this.chatService.sendMessage(userInput, this.userId).subscribe((botResponse: any) => {
      // Process the chatbot's response
      this.appendMessage('VERMEG', botResponse);
    });

    // Reset the user input field
    this.userInputElementValue = '';
  }

  appendMessage(sender: string, message: string): void {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    this.chatDisplay.nativeElement.appendChild(messageElement);
    this.chatDisplay.nativeElement.scrollTop = this.chatDisplay.nativeElement.scrollHeight;
    setTimeout(() => {
      messageElement.classList.add('show');
    }, 10);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.userInputElementValue = inputElement.value;
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage(this.userInputElementValue);
    }
  }
}
