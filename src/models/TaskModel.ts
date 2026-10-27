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

    addTask(title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string): Task {
        const newTask: Task = {
            id: this.currentId,
            title,
            description,
            completed: false,
            priority,
            dueDate
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

    isOverdue(task: Task): boolean {
        if (task.completed || !task.dueDate) {
            return false;
        }
        const today = new Date().toISOString().split('T')[0] ?? '';
        return task.dueDate < today;
    }

    toggleComplete(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.storage.saveTasks(this.tasks);
        }
    }
}