import { TaskModel } from './models/TaskModel.js';
import { TaskView } from './views/TaskView.js';
import { TaskController } from './controllers/TaskController.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new TaskModel();
    const view = new TaskView();
    const controller = new TaskController(model, view);
}); 