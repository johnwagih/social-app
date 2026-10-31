import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterFeedComponent } from './center-feed.component';

describe('CenterFeedComponent', () => {
  let component: CenterFeedComponent;
  let fixture: ComponentFixture<CenterFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterFeedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
