import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationRedirectionComponent } from './verification-redirection.component';

describe('VerificationRedirectionComponent', () => {
  let component: VerificationRedirectionComponent;
  let fixture: ComponentFixture<VerificationRedirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationRedirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
