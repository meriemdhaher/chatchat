import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';
import { AppComponent } from './app.component';
import { ChatService } from '../app/chat-service.service';

@NgModule({
  declarations: [
    ChatComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
