import { ProfileService } from './../../core/services/profile/profile.service';
import { Component, inject, OnInit, signal, WritableSignal  } from '@angular/core';
import { ImyProfile } from '../../core/models/imy-profile.interface';
import { DatePipe } from '@angular/common';
import { Imyposts } from '../../core/models/imyposts.interface';
import { IsavedPost } from '../../core/models/isaved-post.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
private readonly profileService = inject(ProfileService)
listmyprofile:WritableSignal<ImyProfile> = signal({} as ImyProfile ) 
listmyposts:WritableSignal<Imyposts> = signal({} as Imyposts ) 
listsavedpost:WritableSignal<IsavedPost[]> = signal([]) 
userId = JSON.parse(localStorage.getItem("socialUser")!)._id
activeCollection: 'posts' | 'saved' = 'posts';
// ngOnInit
ngOnInit(): void {
this.getMyProfile()  
this.getMyPosts(this.userId)
this.getMySavedPost()
}
// getmyprofile
getMyProfile(){
  this.profileService.getMyProfile().subscribe({
    next:(res)=>{
      this.listmyprofile.set(res.data.user)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
// getMyPosts 
getMyPosts(userId:any){
  this.profileService.getMyPosts(userId).subscribe({
    next:(res)=>{
      this.listmyposts.set(res.data)      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
// getMySavedPost
getMySavedPost(){
  this.profileService.getMySavedPost().subscribe({
    next:(res)=>{
      console.log(res);   
      this.listsavedpost.set(res.data.bookmarks)   
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
