import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVisualizationComponent } from './menu-visualization.component';

describe('MenuVisualizationComponent', () => {
  let component: MenuVisualizationComponent;
  let fixture: ComponentFixture<MenuVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
