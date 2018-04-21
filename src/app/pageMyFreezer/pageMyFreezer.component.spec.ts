import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyFreezerComponent } from './pageMyFreezer.component';

describe('PageMyFreezerComponent', () => {
  let component: PageMyFreezerComponent;
  let fixture: ComponentFixture<PageMyFreezerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMyFreezerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMyFreezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
