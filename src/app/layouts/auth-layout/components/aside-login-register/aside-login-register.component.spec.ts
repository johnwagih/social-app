import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideLoginRegisterComponent } from './aside-login-register.component';

describe('AsideLoginRegisterComponent', () => {
  let component: AsideLoginRegisterComponent;
  let fixture: ComponentFixture<AsideLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideLoginRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsideLoginRegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
