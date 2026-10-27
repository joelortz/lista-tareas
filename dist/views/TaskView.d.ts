import type { Task } from '../models/Task.js';
export declare class TaskView {
    private form;
    private titleInput;
    private descriptionInput;
    private taskList;
    private messageDiv;
    private searchInput;
    private priorityInput;
    private statusFilter;
    private pendingCountEl;
    private dueDateInput;
    constructor();
    getFormData(): {
        title: string;
        description: string;
        priority: 'alta' | 'media' | 'baja';
        dueDate: string;
    };
    clearForm(): void;
    showMessage(text: string, type: 'success' | 'error'): void;
    renderTasks(tasks: Task[], overdueIds?: number[]): void;
    bindAddTask(handler: (title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string) => void): void;
    bindDeleteTask(handler: (id: number) => void): void;
    bindSearch(handler: (query: string) => void): void;
    bindFilterStatus(handler: (status: 'all' | 'pending' | 'completed') => void): void;
    bindToggleComplete(handler: (id: number) => void): void;
    renderPendingCount(count: number): void;
}
//# sourceMappingURL=TaskView.d.ts.map