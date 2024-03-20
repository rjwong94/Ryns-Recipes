import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitIngredientComponent } from './submit-ingredient.component';

describe('SubmitIngredientComponent', () => {
  let component: SubmitIngredientComponent;
  let fixture: ComponentFixture<SubmitIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
