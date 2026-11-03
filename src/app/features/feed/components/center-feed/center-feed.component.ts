import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { PostsCommentsComponent } from '../posts-comments/posts-comments/posts-comments.component';
import { RouterLink } from '@angular/router';
import { IUser } from '../../../../core/models/iuser.interface';
import { FormControl, FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { form } from '@angular/forms/signals';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-center-feed',
  imports: [  TranslatePipe ,PostsCommentsComponent, RouterLink, ɵInternalFormsSharedModule , ReactiveFormsModule , FormsModule , DatePipe],
  templateUrl: './center-feed.component.html',
  styleUrl: './center-feed.component.css',
})
export class CenterFeedComponent implements OnInit {
    private readonly toster = inject(ToastrService)

  arrPost:WritableSignal<Iposts[]> = signal([])
  userdata:WritableSignal<IUser> = signal({} as IUser)
  imgToHtml:WritableSignal<string | ArrayBuffer | null | undefined> = signal("")
  // glopabformdata:WritableSignal<any>=signal("")
  // 1. fileImage =========
  fileImage:WritableSignal< undefined | File > = signal(undefined)
  // 2. inputBody =========
  bodyInput = new FormControl("")  
  // 3. inputPrivacy ======
  privacyInput = new FormControl('public')  
  private readonly postsService = inject(PostsService)
ngOnInit(){
this.getallPosts()  
this.readUserData()

// getallPosts ===============
}
// getallPosts ================
getallPosts(){
this.postsService.getPosts().subscribe({
    next:(res)=>{
      this.arrPost.set(res.data.posts)
      console.log(res);
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

// readUserData =================
readUserData():void{
  if (localStorage.getItem("socialUser")  ) {
    this.userdata.set(JSON.parse(localStorage.getItem("socialUser")!))
  
  }
}

// getImageFile ================
getImageFile(e:Event){
  const inpurImage = e.target as HTMLInputElement
  this.fileImage.set(inpurImage.files?.[0])
  console.log(this.fileImage());
  let fileReader = new FileReader
const imageFile = this.fileImage();
if (imageFile) {
  fileReader.readAsDataURL(imageFile);
  fileReader.onload=(e)=>{
    this.imgToHtml.set(e.target?.result)
  }
}
}

// createPost =================
createPost(FormData:FormData , form:HTMLFormElement){
  this.postsService.craetePost(FormData).subscribe({
    next:(res)=>{
      this.getallPosts()
       this.toster.success(res.message , `Success`)

      form.reset()
      this.bodyInput.reset('');
      this.resetphoto()
    },
    error:(err)=>{
      console.log(err);
    }
  })
} 

// resetphoto ==================
resetphoto(){
      this.imgToHtml.set(null)
      this.fileImage.set(undefined)
}

// submitForm ==================
submitForm(e:SubmitEvent ,form:HTMLFormElement){
  e.preventDefault()
  let formData = new FormData 
  const body = this.bodyInput.value 
  if (body) {
    formData.append('body' , body!)
  }
    const imageFile = this.fileImage();
  if (imageFile) {
    formData.append('image', imageFile);
  }
  const privacy = this.privacyInput.value
  if (privacy) {
    formData.append('privacy' , privacy)
  }
    this.createPost(formData ,form)
  }

  // deletePost==========
  deletePost(post_id:any){
    this.postsService.deletePost(post_id).subscribe({
      next:(res)=>{
        this.getallPosts()
        this.toster.success(res.message , `Success`)

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // editPost=========
  body: string = '';
  privacy: string = '';
  image:String= ""
  selectedPost: any = null;
  model :WritableSignal<boolean> = signal(true)
  editPost(post:any){
    this.selectedPost = post;
    // console.log(post);
    this.body= post.body
    this.privacy= post.privacy
    this.image= post.image
    if (this.model()==true) {
      this.model.set(false) 
    }
    else{
      this.model.set(true)
    }
  }
  // onImageSelected
    newImageFile: File | null = null;
    onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
    this.newImageFile = input.files[0];
    this.image = URL.createObjectURL(this.newImageFile);
}
}
  // updatePost=========
  updatePost() {
  if (!this.selectedPost) {
  return;
  }
  const formData = new FormData()
  if (this.body.trim()) {
  formData.append('body', this.body);
  }
  if (this.newImageFile) {
  formData.append('image', this.newImageFile);
  }
  if (this.privacy) {
  formData.append('privacy', this.privacy);
  }
  this.postsService.updatePost(this.selectedPost._id, formData).subscribe({
  next: (res) => {
  // console.log(res);
  this.toster.success(res.message , `Success`)
  this.getallPosts();
  this.model.set(true);
  this.newImageFile = null;
  },
  error: (err) => {
  console.log(err);
  }
  });
  }
}