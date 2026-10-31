import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})


export class PostsService {
  private readonly httpClient = inject(HttpClient)
  // myheaders:object = {headers:{
  //     Authorization : `Bearer ${localStorage.getItem(`socialToken`)}`
  //   }}
  getPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts`) 
  }
  craetePost(body:FormData):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/posts`,body )
  }
  deletePost(post_id:any):Observable<any>{
   return this.httpClient.delete(`${environment.baseUrl}/posts/${post_id}`)
  }
  updatePost(post_id:any,body:any):Observable<any>{
   return this.httpClient.put(`${environment.baseUrl}/posts/${post_id}`  ,body)
  }
  getPostDetailes(post_id:any):Observable<any>{
   return this.httpClient.get(`${environment.baseUrl}/posts/${post_id}`)
  }
}
