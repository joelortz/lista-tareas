import type { Task } from '../models/Task.js';

const STORAGE_KEY = 'tasks';

export class StorageService {
    saveTasks(tasks: Task[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    loadTasks(): Task[] {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return [];
        }
        return JSON.parse(data) as Task[];
    }
}