import type { Task } from '../models/Task.js';
export declare class TaskView {
    private form;
    private titleInput;
    private descriptionInput;
    private taskList;
    private messageDiv;
    private searchInput;
    constructor();
    getFormData(): {
        title: string;
        description: string;
    };
    clearForm(): void;
    showMessage(text: string, type: 'success' | 'error'): void;
    renderTasks(tasks: Task[]): void;
    bindAddTask(handler: (title: string, description: string) => void): void;
    bindDeleteTask(handler: (id: number) => void): void;
    bindSearch(handler: (query: string) => void): void;
}
//# sourceMappingURL=TaskView.d.ts.map