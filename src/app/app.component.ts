import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackathon-ds-ui';
  dialogflow: any = [];
  subscription: Subscription;
  statusText: string;


  constructor(private restApi: RestService) { }

  ngOnInit() {
    let count = 0;
    let isUpdated = true;
    let storeTimestamp = "";
    this.subscription = timer(0, 3000).pipe(
      switchMap(() => this.restApi.getPosts())
    ).subscribe((data: {}) => {
      this.dialogflow = data;
      if (isUpdated) {
        storeTimestamp = this.dialogflow.timestamp;
        isUpdated = false;
      } else if (storeTimestamp != this.dialogflow.timestamp) {
        this.cleanupPostalCodes();
        isUpdated = true;
      }
    })
  }

  cleanupPostalCodes() {
    $(document).ready(function () {
      $('#iframe-main').attr('src', "http://localhost:7701/1/1/workflow");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

