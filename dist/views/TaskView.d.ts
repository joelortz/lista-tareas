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
    private editingId;
    private sortBySelect;
    constructor();
    getFormData(): {
        title: string;
        description: string;
        priority: 'alta' | 'media' | 'baja';
        dueDate: string;
        editingId: number | null;
    };
    clearForm(): void;
    showMessage(text: string, type: 'success' | 'error'): void;
    renderTasks(tasks: Task[], overdueIds?: number[]): void;
    loadTaskIntoForm(task: Task): void;
    bindAddTask(handler: (title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string, editingId: number | null) => void): void;
    bindDeleteTask(handler: (id: number) => void): void;
    bindSearch(handler: (query: string) => void): void;
    bindFilterStatus(handler: (status: 'all' | 'pending' | 'completed') => void): void;
    bindToggleComplete(handler: (id: number) => void): void;
    bindEditTask(handler: (id: number) => void): void;
    bindSort(handler: (sortBy: 'title' | 'dueDate' | 'priority') => void): void;
    renderPendingCount(count: number): void;
}
//# sourceMappingURL=TaskView.d.ts.map