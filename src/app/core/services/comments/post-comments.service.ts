import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostCommentsService {
private readonly httpClient  = inject(HttpClient)
// myheaders:object = {
//   headers:{
//     AUTHORIZATION:`Bearer ${localStorage.getItem(`socialToken`)}`
//   }
// }
// getAllComments
getAllComments(postid:any):Observable<any>{
return this.httpClient.get(`${environment.baseUrl}/posts/${postid}/comments` )
}
// createComment
createComment(postid:any,body:any):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}/posts/${postid}/comments` , body  )
}
// deleteComment
deleteComment(postid:any,commentid:any):Observable<any>{
return this.httpClient.delete(`${environment.baseUrl}/posts/${postid}/comments/${commentid}` )
}
// updateComment
updateComment(postid:any,commentid:any ,body:any):Observable<any>{
return this.httpClient.put(`${environment.baseUrl}/posts/${postid}/comments/${commentid}`,body )
}









}
