import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService  {
private readonly httpClient = inject(HttpClient)
myheader:object = {
  headers:{
AUTHORIZATION : `Bearer ${localStorage.getItem("socialToken")}`
  }
}
// getMyProfile
getMyProfile():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/users/profile-data`, this.myheader)
}
// getMyPosts
getMyPosts(userId:any):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`, this.myheader)
}
// getMySavedPost
getMySavedPost():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`, this.myheader)
}
}
