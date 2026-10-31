import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostsComponent } from './save-posts.component';

describe('SavePostsComponent', () => {
  let component: SavePostsComponent;
  let fixture: ComponentFixture<SavePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavePostsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
