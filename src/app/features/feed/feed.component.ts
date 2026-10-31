import { Component } from '@angular/core';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { CenterFeedComponent } from './components/center-feed/center-feed.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-feed',
  imports: [LeftSidebarComponent, CenterFeedComponent, RightSidebarComponent, NavComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
