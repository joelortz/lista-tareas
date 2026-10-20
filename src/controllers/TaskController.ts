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
        this.view.renderTasks(this.model.getAllTasks());
    }

    private handleAddTask(title: string, description: string, priority: 'alta' | 'media' | 'baja'): void {
        if (!title) {
            this.view.showMessage('El título es obligatorio', 'error');
            return;
        }

        this.model.addTask(title, description, priority);
        this.view.renderTasks(this.model.getAllTasks());
        this.view.clearForm();
        this.view.showMessage('Tarea agregada correctamente', 'success');
    }

    private handleDeleteTask(id: number): void {
        this.model.deleteTask(id);
        this.view.renderTasks(this.model.getAllTasks());
        this.view.showMessage('Tarea eliminada', 'success');
    }

    private handleSearch(query: string): void {
        if (!query) {
            this.view.renderTasks(this.model.getAllTasks());
            return;
        }
        this.view.renderTasks(this.model.searchTasks(query));
    }
}   