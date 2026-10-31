import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangePassService {


  private readonly httpClient = inject (HttpClient)
// myheaders:object = {
//   headers:{
//     Authorization:`Bearer ${localStorage.getItem(`socialToken`)}`
//   }
// }

  changPass(body:any):Observable<any>{
     return this.httpClient.patch(`${environment.baseUrl}/users/change-password` , body   )
  } 

}
