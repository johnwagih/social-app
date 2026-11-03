import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../../../core/models/iuser.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-left-sidebar',
  imports: [TranslatePipe ,  RouterLink ,  RouterLinkActive],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent implements OnInit {


    userData:WritableSignal<IUser> =signal({}as IUser)

  ngOnInit(): void {
  this.userData.set(JSON.parse(localStorage.getItem("socialUser")!))
    
  }
}
