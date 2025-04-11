export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
