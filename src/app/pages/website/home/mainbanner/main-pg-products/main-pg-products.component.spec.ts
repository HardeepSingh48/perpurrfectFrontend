import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPgProductsComponent } from './main-pg-products.component';

describe('MainPgProductsComponent', () => {
  let component: MainPgProductsComponent;
  let fixture: ComponentFixture<MainPgProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPgProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPgProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
