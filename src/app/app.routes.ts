import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuardsGuard } from './core/auth/guards/auth-guards-guard';
import { alreadyLoginGuard } from './core/auth/guards/already-login-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { SavePostsComponent } from './features/save-posts/save-posts.component';
import { NotificationsComponent } from './features/notifications/notifications.component';

export const routes: Routes = [
    {path:"" , canActivate:[alreadyLoginGuard], component:AuthLayoutComponent , children:[
        {path:"login" , component:LoginComponent},
        {path:"register" , component:RegisterComponent},
    ]},
    {path:"" ,canActivate:[authGuardsGuard] , component:MainLayoutComponent , children:[
        {path:"feed" , component:FeedComponent},
        {path:"moreDetails/:post_id" , component:PostDetailsComponent},
        {path:"profile" , component:ProfileComponent},
        {path:"saveposts" , component:SavePostsComponent},
        {path:"changepassword" , component:ChangePasswordComponent},
        {path:"forgotpassword" , component:ForgotPasswordComponent},
        {path:"notification" , component:NotificationsComponent},
    ]},
    {path:"**" , component:NotFoundComponent}
];
