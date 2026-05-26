export type Id = string;

export type Task = {
  id: Id;
  content: string;
};

export type Column = {
  id: Id;
  title: string;
  taskIds: Id[];
};

export type BoardData = {
  tasks: Record<Id, Task>;
  columns: Record<Id, Column>;
  columnOrder: Id[];
};

export const initialData: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Set up Vite & React' },
    'task-2': { id: 'task-2', content: 'Define TypeScript interfaces' },
    'task-3': { id: 'task-3', content: 'Build static UI components' },
    'task-4': { id: 'task-4', content: 'Research drag-and-drop libraries' },
  },
  columns: {
    'col-todo': {
      id: 'col-todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'col-in-progress': {
      id: 'col-in-progress',
      title: 'In Progress',
      taskIds: [],
    },
    'col-done': {
      id: 'col-done',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['col-todo', 'col-in-progress', 'col-done'],
};