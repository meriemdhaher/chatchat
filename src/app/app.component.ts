import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Vous pouvez ajuster les styles
})
export class AppComponent {
gradientStyle: any;
boxShadowStyle: any;
chatContainerOpen: any;
links: any;
sendUserMessage(arg0: string) {
throw new Error('Method not implemented.');
}
toggleChatContainer() {
throw new Error('Method not implemented.');
}




panelCollapsed = false;

  togglePanel() {
    this.panelCollapsed = !this.panelCollapsed;
  }

  focusInput() {
    if (this.panelCollapsed) {
      this.togglePanel();
    }
  }

  createNewChat() {
    // Logique pour créer une nouvelle fenêtre de chat
  }

  closeChat() {
    // Logique pour fermer une fenêtre de chat
  }

  title='chatbot-angular'; }