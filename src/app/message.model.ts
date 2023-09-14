export class Message {
contextGlobal: any;

  constructor(public author: string, public content: string, public context: string) {}
}
export interface Message {
  author: string;
  content: string;
  context: string;
  contextGlobal: any; // Marquez-la comme optionnelle
}