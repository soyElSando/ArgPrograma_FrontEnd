import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBackComponent } from './get-back.component';

describe('GetBackComponent', () => {
  let component: GetBackComponent;
  let fixture: ComponentFixture<GetBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
