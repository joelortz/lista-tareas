import type { Task } from '../models/Task.js';

export class TaskView {
    private form: HTMLFormElement;
    private titleInput: HTMLInputElement;
    private descriptionInput: HTMLTextAreaElement;
    private taskList: HTMLDivElement;
    private messageDiv: HTMLDivElement;
    private searchInput: HTMLInputElement;
    private priorityInput: HTMLSelectElement;
    private statusFilter: HTMLSelectElement;
    private pendingCountEl: HTMLParagraphElement;
    private dueDateInput: HTMLInputElement;
    private editingId: number | null = null;
    private sortBySelect: HTMLSelectElement;

    constructor() {
        this.form = document.getElementById('taskForm') as HTMLFormElement;
        this.titleInput = document.getElementById('taskTitle') as HTMLInputElement;
        this.descriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
        this.taskList = document.getElementById('taskList') as HTMLDivElement;
        this.messageDiv = document.getElementById('message') as HTMLDivElement;
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
        this.priorityInput = document.getElementById('taskPriority') as HTMLSelectElement;
        this.statusFilter = document.getElementById('statusFilter') as HTMLSelectElement;
        this.pendingCountEl = document.getElementById('pendingCount') as HTMLParagraphElement;
        this.dueDateInput = document.getElementById('taskDueDate') as HTMLInputElement;
        this.sortBySelect = document.getElementById('sortBy') as HTMLSelectElement;
    }

    getFormData(): { title: string; description: string; priority: 'alta' | 'media' | 'baja'; dueDate: string; editingId: number | null } {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            priority: this.priorityInput.value as 'alta' | 'media' | 'baja',
            dueDate: this.dueDateInput.value,
            editingId: this.editingId
        };
    }

    clearForm(): void {
        this.form.reset();
    }

    showMessage(text: string, type: 'success' | 'error') {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `message ${type}`;
        setTimeout(() => {
            this.messageDiv.textContent = '';
            this.messageDiv.className = 'message';
        }, 3000);
    }

    renderTasks(tasks: Task[], overdueIds: number[] = []): void {
        if (tasks.length === 0) {
            this.taskList.innerHTML = '<p>No hay tareas registradas</p>';
            return;
        }

        this.taskList.innerHTML = tasks
            .map(task => `
                <div class="task-card ${overdueIds.includes(task.id) ? 'overdue' : ''}">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <span>${task.completed ? 'Completada' : 'Pendiente'}</span>
                    <span class="priority-${task.priority}">${task.priority}</span>
                    <p>Vence: ${task.dueDate || 'Sin fecha'}</p>
                    <button data-id="${task.id}" class="toggle-btn">${task.completed ? 'Marcar pendiente' : 'Completar'}</button>
                    <button data-id="${task.id}" class="delete-btn">Eliminar</button>
                    <button data-id="${task.id}" class="edit-btn">Editar</button>
                </div>
            `)
            .join('');
    }

    loadTaskIntoForm(task: Task): void {
        this.editingId = task.id;
        this.titleInput.value = task.title;
        this.descriptionInput.value = task.description;
        this.priorityInput.value = task.priority;
        this.dueDateInput.value = task.dueDate;
        this.form.querySelector('button[type="submit"]')!.textContent = 'Actualizar tarea';
    }

    bindAddTask(handler: (title: string, description: string, priority: 'alta' | 'media' | 'baja', dueDate: string, editingId: number | null) => void): void {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const { title, description, priority, dueDate, editingId } = this.getFormData();
            handler(title, description, priority, dueDate, editingId);
            this.editingId = null;
            this.form.querySelector('button[type="submit"]')!.textContent = 'Agregar tarea';
        });
    }

    bindDeleteTask(handler: (id: number) => void): void {
        this.taskList.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('delete-btn')) {
                const id = Number(target.dataset.id);
            if (confirm('¿Eliminar esta tarea?')) {
                handler(id);
                }
            }
        });
    }

    bindSearch(handler: (query: string) => void): void {
        this.searchInput.addEventListener('input', () => {
            handler(this.searchInput.value.trim());
        });
    }

    bindFilterStatus(handler: (status: 'all' | 'pending' | 'completed') => void): void {
        this.statusFilter.addEventListener('change', () => {
            handler(this.statusFilter.value as 'all' | 'pending' | 'completed');
        });
    }

    bindToggleComplete(handler: (id: number) => void): void {
        this.taskList.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('toggle-btn')) {
                handler(Number(target.dataset.id));
            }
        });
    }

    bindEditTask(handler: (id: number) => void): void {
        this.taskList.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('edit-btn')) {
                handler(Number(target.dataset.id));
            }
        });
    }

    bindSort(handler: (sortBy: 'title' | 'dueDate' | 'priority') => void): void {
        this.sortBySelect.addEventListener('change', () => {
            handler(this.sortBySelect.value as 'title' | 'dueDate' | 'priority');
        });
    }

    renderPendingCount(count: number): void {
        this.pendingCountEl.textContent = `Tareas pendientes: ${count}`;
    }   
}   