interface Todo {
  title: string;
  status: string;
  priority: string;
  due_date: Date;
}

export const todos: Todo[] = [
  {
    title: "Complete project report",
    status: "not started",
    priority: "high",
    due_date: new Date("2023-10-15"),
  },
  {
    title: "Buy groceries",
    status: "pending",
    priority: "medium",
    due_date: new Date("2023-10-12"),
  },
  {
    title: "Call mom for birthday",
    status: "not started",
    priority: "high",
    due_date: new Date("2023-10-20"),
  },
  {
    title: "Schedule dentist appointment",
    status: "completed",
    priority: "low",
    due_date: new Date("2023-10-05"),
  },
  {
    title: "Finish React tutorial",
    status: "pending",
    priority: "medium",
    due_date: new Date("2023-10-18"),
  },
  {
    title: "Pay electricity bill",
    status: "not started",
    priority: "high",
    due_date: new Date("2023-10-10"),
  },
  {
    title: "Plan weekend trip",
    status: "not started",
    priority: "low",
    due_date: new Date("2023-10-25"),
  },
  {
    title: "Clean garage",
    status: "pending",
    priority: "medium",
    due_date: new Date("2023-10-14"),
  },
  {
    title: "Renew gym membership",
    status: "not started",
    priority: "medium",
    due_date: new Date("2023-10-30"),
  },
  {
    title: "Organize work desk",
    status: "completed",
    priority: "low",
    due_date: new Date("2023-10-08"),
  },
];
