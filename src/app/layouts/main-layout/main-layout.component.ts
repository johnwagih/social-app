import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../features/nav/nav.component';
import { LeftSidebarComponent } from '../../features/feed/components/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavComponent, LeftSidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
