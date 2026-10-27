import { TaskModel } from '../models/TaskModel.js';
import { TaskView } from '../views/TaskView.js';
export class TaskController {
    model;
    view;
    currentStatus = 'all';
    currentQuery = '';
    currentSort = 'title';
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
        this.view.bindToggleComplete(this.handleToggleComplete.bind(this));
        this.view.bindEditTask(this.handleEditTask.bind(this));
        this.view.bindSort(this.handleSort.bind(this));
        this.refresh();
    }
    refresh() {
        let tasks = this.currentQuery
            ? this.model.searchTasks(this.currentQuery)
            : this.model.filterByStatus(this.currentStatus);
        tasks = this.model.sortTasks(tasks, this.currentSort);
        const overdueIds = this.model.getAllTasks()
            .filter(t => this.model.isOverdue(t))
            .map(t => t.id);
        this.view.renderTasks(tasks, overdueIds);
        this.view.renderPendingCount(this.model.getPendingCount());
    }
    handleAddTask(title, description, priority, dueDate, editingId) {
        if (!title) {
            this.view.showMessage('El título es obligatorio', 'error');
            return;
        }
        if (editingId !== null) {
            this.model.updateTask(editingId, title, description, priority, dueDate);
            this.view.showMessage('Tarea actualizada correctamente', 'success');
        }
        else {
            this.model.addTask(title, description, priority, dueDate);
            this.view.showMessage('Tarea agregada correctamente', 'success');
        }
        this.refresh();
        this.view.clearForm();
    }
    handleDeleteTask(id) {
        this.model.deleteTask(id);
        this.refresh();
        this.view.showMessage('Tarea eliminada', 'success');
    }
    handleSearch(query) {
        this.currentQuery = query;
        this.refresh();
    }
    handleFilterStatus(status) {
        this.currentStatus = status;
        this.refresh();
    }
    handleSort(sortBy) {
        this.currentSort = sortBy;
        this.refresh();
    }
    handleToggleComplete(id) {
        this.model.toggleComplete(id);
        this.refresh();
    }
    handleEditTask(id) {
        const task = this.model.getAllTasks().find(t => t.id === id);
        if (task) {
            this.view.loadTaskIntoForm(task);
        }
    }
}
//# sourceMappingURL=TaskController.js.map