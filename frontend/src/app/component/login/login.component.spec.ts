import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogibComponent } from './login.component';

describe('LogibComponent', () => {
  let component: LogibComponent;
  let fixture: ComponentFixture<LogibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogibComponent]
    });
    fixture = TestBed.createComponent(LogibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
