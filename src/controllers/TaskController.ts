import { TaskModel } from '../models/TaskModel.js';
import { TaskView } from '../views/TaskView.js';

export class TaskController {
    constructor(
        private model: TaskModel,
        private view: TaskView
    ) {
        this.init();
    }

    private init(): void {
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
        this.view.bindSearch(this.handleSearch.bind(this));
        this.view.bindFilterStatus(this.handleFilterStatus.bind(this));
        this.view.bindToggleComplete(this.handleToggleComplete.bind(this));
        this.view.bindEditTask(this.handleEditTask.bind(this));
        this.refresh();
    }

    private refresh(): void {
        const tasks = this.model.getAllTasks();
        const overdueIds = tasks.filter(t => this.model.isOverdue(t)).map(t => t.id);
        this.view.renderTasks(tasks, overdueIds);
        this.view.renderPendingCount(this.model.getPendingCount());
    }

    private handleAddTask(title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string, editingId: number | null): void {
        if (!title) {
            this.view.showMessage('El título es obligatorio', 'error');
            return;
        }

        if (editingId !== null) {
            this.model.updateTask(editingId, title, description, priority, dueDate);
            this.view.showMessage('Tarea actualizada correctamente', 'success');
        } else {
            this.model.addTask(title, description, priority, dueDate);
            this.view.showMessage('Tarea agregada correctamente', 'success');
        }

        this.refresh();
        this.view.clearForm();
    }

    private handleDeleteTask(id: number): void {
        this.model.deleteTask(id);
        this.refresh();
        this.view.showMessage('Tarea eliminada', 'success');
    }

    private handleSearch(query: string): void {
        if (!query) {
            this.view.renderTasks(this.model.getAllTasks());
            return;
        }
        this.view.renderTasks(this.model.searchTasks(query));
    }

    private handleFilterStatus(status: 'all' | 'pending' | 'completed'): void {
        this.view.renderTasks(this.model.filterByStatus(status));
    }

    private handleToggleComplete(id: number): void {
        this.model.toggleComplete(id);
        this.refresh();
    }

    private handleEditTask(id: number): void {
        const task = this.model.getAllTasks().find(t => t.id === id);
        if (task) {
            this.view.loadTaskIntoForm(task);
        }
    }
}