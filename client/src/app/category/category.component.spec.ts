import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryManagerComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryManagerComponent;
  let fixture: ComponentFixture<CategoryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
