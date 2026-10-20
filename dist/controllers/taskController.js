import { TaskModel } from '../models/TaskModel.js';
import { TaskView } from '../views/TaskView.js';
export class TaskController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    init() {
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
        this.view.bindSearch(this.handleSearch.bind(this));
        this.view.bindFilterStatus(this.handleFilterStatus.bind(this));
        this.refresh();
    }
    refresh() {
        this.view.renderTasks(this.model.getAllTasks());
        this.view.renderPendingCount(this.model.getPendingCount());
    }
    handleAddTask(title, description, priority) {
        if (!title) {
            this.view.showMessage('El título es obligatorio', 'error');
            return;
        }
        this.model.addTask(title, description, priority);
        this.refresh();
        this.view.clearForm();
        this.view.showMessage('Tarea agregada correctamente', 'success');
    }
    handleDeleteTask(id) {
        this.model.deleteTask(id);
        this.refresh();
        this.view.showMessage('Tarea eliminada', 'success');
    }
    handleSearch(query) {
        if (!query) {
            this.view.renderTasks(this.model.getAllTasks());
            return;
        }
        this.view.renderTasks(this.model.searchTasks(query));
    }
    handleFilterStatus(status) {
        this.view.renderTasks(this.model.filterByStatus(status));
    }
}
//# sourceMappingURL=TaskController.js.map