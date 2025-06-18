import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterListPageComponent } from './register-list-page.component';

describe('RegisterListPageComponent', () => {
  let component: RegisterListPageComponent;
  let fixture: ComponentFixture<RegisterListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
