import { PostDetailes } from './../../core/models/ipost-detailes.interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-post-details',
  imports: [ TranslatePipe, RouterLink , DatePipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit{
  private readonly toster = inject(ToastrService)
  private readonly activatedRoute  = inject(ActivatedRoute)
  private readonly postsService  = inject(PostsService)
  listPostDetailes: WritableSignal<PostDetailes> = signal({} as PostDetailes)
  postId = signal("")
ngOnInit(): void {
  this.readPostId()
}
readPostId(){
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.postId.set(res.get("post_id")!)
      // this.toster.success(res.message , `Success`)
      // console.log(this.postId()); 
      this.postsService.getPostDetailes(this.postId()).subscribe({
        next:(res)=>{
          // console.log(res);      
          // console.log(res);      
          this.toster.success(res.message , `Success`)     
          this.listPostDetailes.set(res.data.post)
          console.log(this.listPostDetailes());
             
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  })
}


}
