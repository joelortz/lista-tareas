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
        this.view.renderTasks(this.model.getAllTasks());
    }
    handleAddTask(title, description) {
        if (!title) {
            this.view.showMessage('El título es obligatorio', 'error');
            return;
        }
        this.model.addTask(title, description);
        this.view.renderTasks(this.model.getAllTasks());
        this.view.clearForm();
        this.view.showMessage('Tarea agregada correctamente', 'success');
    }
    handleDeleteTask(id) {
        this.model.deleteTask(id);
        this.view.renderTasks(this.model.getAllTasks());
        this.view.showMessage('Tarea eliminada', 'success');
    }
    handleSearch(query) {
        if (!query) {
            this.view.renderTasks(this.model.getAllTasks());
            return;
        }
        this.view.renderTasks(this.model.searchTasks(query));
    }
}
//# sourceMappingURL=TaskController.js.map