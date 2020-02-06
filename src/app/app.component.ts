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
  workflows: any = [];


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
        console.log(this.dialogflow.queryResult.intent.displayName);
        if(this.dialogflow.queryResult.intent.displayName == 'clean-phone-codes-dataset-country-operations'){
          this.redirectPage('workflow'); 
        }else if(this.dialogflow.queryResult.intent.displayName == 'validate-email-dataset-operations-optional'){
          this.redirectPage('workflow'); 
        }else if(this.dialogflow.queryResult.intent.displayName == 'tutorial-videos-general-final'){
          this.redirectPage('tutorial'); 
        }else if(this.dialogflow.queryResult.intent.displayName == 'tutorial-videos-manipulation-final'){
          this.redirectPage('tutorial'); 
        }
                
        isUpdated = true;
      }

      console.log(this.dialogflow.queryResult.intent.displayName, isUpdated);
    })
  }

  redirectPage(source) {
    if(source == 'workflow'){
      $(document).ready(function () {
        $('#iframe-main').attr('src', "http://localhost:7701/1/1/workflow");
      });
    } else {
      $(document).ready(function () {
        window.open('http://www.youtube.com', 'mywindow', 'width=600, height=500');
      });
    }

  }

  triggerWorkflow() {
    var workflow = {
      "externalLabel": "CleanPhoneCodes",
      "versionToExecute": "PreferDraft",
      "dependenciesToUse": "PreferDraft"
    }

    this.restApi.triggerWorkflow(workflow).subscribe((res)=>{
      console.log("workflow triggered");
      console.log(res);
});

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

