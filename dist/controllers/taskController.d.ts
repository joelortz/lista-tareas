import { TaskModel } from '../models/TaskModel.js';
import { TaskView } from '../views/TaskView.js';
export declare class TaskController {
    private model;
    private view;
    private currentStatus;
    private currentQuery;
    private currentSort;
    constructor(model: TaskModel, view: TaskView);
    private init;
    private refresh;
    private handleAddTask;
    private handleDeleteTask;
    private handleSearch;
    private handleFilterStatus;
    private handleSort;
    private handleToggleComplete;
    private handleEditTask;
}
//# sourceMappingURL=TaskController.d.ts.map