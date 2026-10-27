import type { Task } from './Task.js';
export declare class TaskModel {
    private tasks;
    private currentId;
    private storage;
    constructor();
    addTask(title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string): Task;
    getAllTasks(): Task[];
    deleteTask(id: number): void;
    searchTasks(query: string): Task[];
    filterByStatus(status: 'all' | 'pending' | 'completed'): Task[];
    getPendingCount(): number;
    isOverdue(task: Task): boolean;
    toggleComplete(id: number): void;
    updateTask(id: number, title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string): void;
}
//# sourceMappingURL=TaskModel.d.ts.map