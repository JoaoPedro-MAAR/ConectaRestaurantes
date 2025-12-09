import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVisualizationComponent } from './order-visualization.component';

describe('OrderVisualizationComponent', () => {
  let component: OrderVisualizationComponent;
  let fixture: ComponentFixture<OrderVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
