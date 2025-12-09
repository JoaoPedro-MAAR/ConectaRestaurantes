import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderComponent } from './list-order.component';

describe('ListOrderComponent', () => {
  let component: ListOrderComponent;
  let fixture: ComponentFixture<ListOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
