import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Vous pouvez ajuster les styles
})
export class AppComponent{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}