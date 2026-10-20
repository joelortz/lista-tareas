import type { Task } from './Task.js';
export declare class TaskModel {
    private tasks;
    private currentId;
    private storage;
    constructor();
    addTask(title: string, description: string, priority: 'alta' | 'media' | 'baja'): Task;
    getAllTasks(): Task[];
    deleteTask(id: number): void;
    searchTasks(query: string): Task[];
    filterByStatus(status: 'all' | 'pending' | 'completed'): Task[];
    getPendingCount(): number;
}
//# sourceMappingURL=TaskModel.d.ts.map