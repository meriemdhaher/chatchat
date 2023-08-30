// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component'; // Importez ici
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent // Ajoutez ici
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
