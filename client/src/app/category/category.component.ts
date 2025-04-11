// components/category-manager/category-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../core/services/category.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./category.component.scss'],
})
export class CategoryManagerComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;

    this.categoryService
      .createCategory({
        name: this.newCategoryName,
      })
      .subscribe(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService
        .deleteCategory(id)
        .subscribe(() => this.loadCategories());
    }
  }
}
