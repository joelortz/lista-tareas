import { StorageService } from '../services/StorageService.js';
export class TaskModel {
    tasks = [];
    currentId = 1;
    storage = new StorageService();
    constructor() {
        this.tasks = this.storage.loadTasks();
        this.currentId = this.tasks.length > 0
            ? Math.max(...this.tasks.map(task => task.id)) + 1
            : 1;
    }
    addTask(title, description, priority, dueDate) {
        const newTask = {
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
    getAllTasks() {
        return this.tasks;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.storage.saveTasks(this.tasks);
    }
    searchTasks(query) {
        return this.tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
    }
    filterByStatus(status) {
        if (status === 'all')
            return this.tasks;
        if (status === 'pending')
            return this.tasks.filter(t => !t.completed);
        return this.tasks.filter(t => t.completed);
    }
    getPendingCount() {
        return this.tasks.filter(t => !t.completed).length;
    }
    isOverdue(task) {
        if (task.completed || !task.dueDate) {
            return false;
        }
        const today = new Date().toISOString().split('T')[0] ?? '';
        return task.dueDate < today;
    }
    toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.storage.saveTasks(this.tasks);
        }
    }
    updateTask(id, title, description, priority, dueDate) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            task.description = description;
            task.priority = priority;
            task.dueDate = dueDate;
            this.storage.saveTasks(this.tasks);
        }
    }
}
//# sourceMappingURL=TaskModel.js.map