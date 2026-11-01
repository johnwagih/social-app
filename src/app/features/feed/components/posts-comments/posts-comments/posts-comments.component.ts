import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { PostCommentsService } from '../../../../../core/services/comments/post-comments.service';
import { Icomments } from '../../../../../core/models/icomments.interface';
import { IUser } from '../../../../../core/models/iuser.interface';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-comments',
  imports: [ɵInternalFormsSharedModule, DatePipe ,  ReactiveFormsModule],
  templateUrl: './posts-comments.component.html',
  styleUrl: './posts-comments.component.css',
})
export class PostsCommentsComponent implements OnInit{
    private readonly toster = inject(ToastrService)
private readonly postCommentsService = inject(PostCommentsService)
userid = JSON.parse(localStorage.getItem("socialUser")||"{}")._id
postid:InputSignal<string> = input("")
nameMadePost:InputSignal<string> = input("")
photouser:InputSignal<string> = input("")
listcomments:WritableSignal<Icomments[]> =signal([])
userData:WritableSignal<IUser> =signal({}as IUser)
// ngOnInit
  ngOnInit(): void {
  this.getAllComments()
  this.userData.set(JSON.parse(localStorage.getItem("socialUser")!))}
// getAllComments
getAllComments(){
this.postCommentsService.getAllComments(this.postid()).subscribe({
  next:(res)=>{
    this.listcomments.set(res.data.comments)
    // this.toster.success(res.message , `Success`)
    // console.log(res);
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

// onImageSelected
selectedImage: File | null | string = null;
onImageSelected(event:Event){
  const input = event.target as HTMLInputElement
  const file = input.files?.[0];
  if (file) {
    this.selectedImage=file
    console.log(this.selectedImage);
  }
}
// form controles
inputcontent = new FormControl ("")
inputimage = new FormControl ("")
// creatComment
creatComment(){
  // Form Data
  const formdata = new FormData ()
  formdata.append("content", this.inputcontent.value ?? "");
  if (this.selectedImage)
  {
  formdata.append("image", this.selectedImage);
  }
  this.postCommentsService.createComment(this.postid() , formdata).subscribe({
   next: (res) => {
   console.log(res)
   alert(res.message)
   this.inputcontent.reset()
   this.selectedImage= null
   this.getAllComments()
     },
   error: (err) => {
   console.log(err)
   alert(err.error.message)
   }
  });
}

//  deleteComment 
deleteComment (commentid:any){
  this.postCommentsService.deleteComment(this.postid() , commentid).subscribe({
   next: (res) => {
   console.log(res)
   this.getAllComments()
   alert(res.message)
   },
   error: (err) => {
   console.log(err)
   }
  });
}
// openEditComment
showEditComment = false;
selectedComment: Icomments | null = null;
editContent = new FormControl("");
openEditComment(comment: Icomments) {
  this.selectedComment = comment;
  this.editContent.setValue(comment.content);
  this.showEditComment = true;
}
// updateComment
selectedEditImage: File | null = null;
editImagePreview: string | null = null;
// onEditImageSelected
onEditImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    this.selectedEditImage = file;
        this.editImagePreview = URL.createObjectURL(file);

  }
}
// updateComment
updateComment(commentid: any) {
  const formdata = new FormData();

  formdata.append("content", this.editContent.value ?? "");

  if (this.selectedEditImage) {
    formdata.append("image", this.selectedEditImage);
  }

  this.postCommentsService.updateComment(
    this.postid(),
    commentid,
    formdata
  ).subscribe({
    next: (res) => {
      // console.log(res);
      this.showEditComment = false;
      this.selectedComment = null;
      this.selectedEditImage = null;
      this.editImagePreview = null;

      this.getAllComments();
    },
    error: (err) => {
      console.log(err);
      alert(err.error.message)
    }
  });
}
}
