import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteFreezerComponent } from './pop-up-delete-freezer.component';

describe('PopUpDeleteFreezerComponent', () => {
  let component: PopUpDeleteFreezerComponent;
  let fixture: ComponentFixture<PopUpDeleteFreezerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDeleteFreezerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteFreezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
