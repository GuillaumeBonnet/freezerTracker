import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFreezerMenuComponent } from './pop-up-freezer-menu.component';

describe('PopUpFreezerMenuComponent', () => {
  let component: PopUpFreezerMenuComponent;
  let fixture: ComponentFixture<PopUpFreezerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpFreezerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpFreezerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
