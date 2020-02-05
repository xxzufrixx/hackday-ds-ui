import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  isShow = true;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  constructor() { }

  ngOnInit() {
  }

}
