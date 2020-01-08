import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteComponent } from './pop-up-delete.component';

describe('PopUpDeleteComponent', () => {
  let component: PopUpDeleteComponent;
  let fixture: ComponentFixture<PopUpDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
