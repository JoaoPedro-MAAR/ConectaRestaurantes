import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListPageComponent } from './menu-list-page.component';

describe('MenuListPageComponent', () => {
  let component: MenuListPageComponent;
  let fixture: ComponentFixture<MenuListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
