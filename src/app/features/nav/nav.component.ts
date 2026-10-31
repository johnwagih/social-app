import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../core/models/iuser.interface';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  userData:WritableSignal<IUser> =signal({}as IUser)

  ngOnInit(): void {
  this.userData.set(JSON.parse(localStorage.getItem("socialUser")!))
    
  }
}
