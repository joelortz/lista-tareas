import type { Task } from './Task.js';
import { StorageService } from '../services/StorageService.js';

export class TaskModel {
    private tasks: Task[] = [];
    private currentId: number = 1;
    private storage: StorageService = new StorageService();

    constructor() {
        this.tasks = this.storage.loadTasks();
        this.currentId = this.tasks.length > 0
            ? Math.max(...this.tasks.map(task => task.id)) + 1
            : 1;
    }

    addTask(title: string, description: string, priority: 'alta' | 'media' | 'baja'): Task {
        const newTask: Task = {
            id: this.currentId,
            title,
            description,
            completed: false,
            priority
        };

        this.tasks.push(newTask);
        this.currentId++;
        this.storage.saveTasks(this.tasks);

        return newTask;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.storage.saveTasks(this.tasks);
    }

    searchTasks(query: string): Task[] {
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterByStatus(status: 'all' | 'pending' | 'completed'): Task[] {
        if (status === 'all') return this.tasks;
        if (status === 'pending') return this.tasks.filter(t => !t.completed);
        return this.tasks.filter(t => t.completed);
    }

    getPendingCount(): number {
        return this.tasks.filter(t => !t.completed).length;
    }
}