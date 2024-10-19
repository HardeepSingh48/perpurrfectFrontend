import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcarouselComponent } from './productcarousel.component';

describe('ProductcarouselComponent', () => {
  let component: ProductcarouselComponent;
  let fixture: ComponentFixture<ProductcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
