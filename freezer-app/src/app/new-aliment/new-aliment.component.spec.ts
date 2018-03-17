import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlimentComponent } from './new-aliment.component';

describe('NewAlimentComponent', () => {
  let component: NewAlimentComponent;
  let fixture: ComponentFixture<NewAlimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAlimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
