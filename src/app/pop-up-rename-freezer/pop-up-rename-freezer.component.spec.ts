import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRenameFreezerComponent } from './pop-up-rename-freezer.component';

describe('PopUpRenameFreezerComponent', () => {
  let component: PopUpRenameFreezerComponent;
  let fixture: ComponentFixture<PopUpRenameFreezerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpRenameFreezerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpRenameFreezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
