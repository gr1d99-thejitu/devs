import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeveloperComponent } from './new-developer.component';

describe('NewDeveloperComponent', () => {
  let component: NewDeveloperComponent;
  let fixture: ComponentFixture<NewDeveloperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDeveloperComponent]
    });
    fixture = TestBed.createComponent(NewDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
