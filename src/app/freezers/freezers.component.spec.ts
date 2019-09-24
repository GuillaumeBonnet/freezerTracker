import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezersComponent } from './freezers.component';

describe('FreezersComponent', () => {
  let component: FreezersComponent;
  let fixture: ComponentFixture<FreezersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
