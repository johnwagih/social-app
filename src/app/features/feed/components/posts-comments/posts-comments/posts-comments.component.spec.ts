import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCommentsComponent } from './posts-comments.component';

describe('PostsCommentsComponent', () => {
  let component: PostsCommentsComponent;
  let fixture: ComponentFixture<PostsCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsCommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsCommentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
