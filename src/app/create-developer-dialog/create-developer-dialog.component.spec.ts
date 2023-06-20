import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeveloperDialogComponent } from './create-developer-dialog.component';

describe('CreateDeveloperDialogComponent', () => {
  let component: CreateDeveloperDialogComponent;
  let fixture: ComponentFixture<CreateDeveloperDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDeveloperDialogComponent]
    });
    fixture = TestBed.createComponent(CreateDeveloperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
