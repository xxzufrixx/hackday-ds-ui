import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dialogflow } from './shared/dialogflow';
import { Workflow } from './shared/workflow';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({   
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Default JFfB-jc7-XMus1GRIjgY1iVgDVAD_hyH-sg9hd7BuAxnt0wKBmOVF3PZpm2Z09NAckSvrXdRWPpoXIEGEcyP6GLDRXUK_iN3EBY9Za1kBmUw_tASK_uhPp88WVIGocAi8pGxZDtOYncyFeoDsl9Wq3jDhZv47-VRZpOxCGO_a9fv4WRG-JwJcGFmsyqX18PSHdsofM5f-tTp1osH8UTInk3EOso1APaUGeKB_S04aKRPb7L5b8Xw6IAeAuqrrraQDLCnCaVV2flfrZdv6Wm17Rw4QIZziKCMfT66_jNn3cOciRUQsRdNzX-yYd8prjW3f1dfj_iUOTCslivcnA6svycnI-1d9z02UYfziTcN5BoEeuqqZi70lK_Yhquqzo5_4MytaoPYDnGikjh8FHWX1YwWWSzmrhkoRBicJXq71wLwdIKkS0Wg506whjEDs7itARZpIil0OYYnokLaWCQXapwJIVFScuA4t5o2ywLtYGe88Pkp0sq3fkRweAG7ulSC04A9-UoDzde9_pPoDc04S0nI7_vbzNLVHFYl4nCIsrnR4xVyaOTOEJVONzeWdponqdGO1Q33-mQCLsaI2fexFK6p6s41qi76dDfIdZYWCXvngGlDPaFZqgeLVcV0WbPkra8YiS-AFDbWK92NwIKKKJUvWV6T6gREFzQZn3gifMA'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiURL = 'https://intentreceiverhackathon.azurewebsites.net/api/StatusFunction';

  DsURL = 'http://localhost:7701/api/b8_1/jobs';
  

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Dialogflow> {
    return this.http.get<Dialogflow>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  triggerWorkflow(workflow){
    console.log(workflow);
    return this.http.post(this.DsURL,workflow, httpOptions);
}

  // triggerWorkflow(workflow): Observable<Workflow> {
  //   return this.http.post<Workflow>(this.DsURL, workflow, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}