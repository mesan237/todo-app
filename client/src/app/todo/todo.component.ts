import { Component, OnInit } from '@angular/core';
import { TodoService } from '../core/services/todo.service';
import { Todo } from '../models/todo.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./todo.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  categories: Category[] = [];
  selectedCategory: string | null = null;
  newTodoTitle = '';
  newTodoDescription = '';
  newTodoCategory = '';

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTodos();
  }

  loadTodos(): void {
    if (this.selectedCategory) {
      this.todoService
        .getTodosByCategory(this.selectedCategory)
        .subscribe((todos) => (this.todos = todos));
    } else {
      this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
    }
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    this.todoService
      .createTodo({
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        category: this.newTodoCategory,
      })
      .subscribe(() => {
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.newTodoCategory = '';
        this.loadTodos();
      });
  }

  toggleComplete(todo: Todo): void {
    this.todoService
      .toggleComplete(todo.id, !todo.completed)
      .subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = category;
    this.loadTodos();
  }
}
