import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilterModalComponent } from './menu-filter-modal.component';

describe('MenuFilterModalComponent', () => {
  let component: MenuFilterModalComponent;
  let fixture: ComponentFixture<MenuFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFilterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
