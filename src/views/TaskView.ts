import type { Task } from '../models/Task.js';

export class TaskView {
    private form: HTMLFormElement;
    private titleInput: HTMLInputElement;
    private descriptionInput: HTMLTextAreaElement;
    private taskList: HTMLDivElement;
    private messageDiv: HTMLDivElement;
    private searchInput: HTMLInputElement;

    constructor() {
        this.form = document.getElementById('taskForm') as HTMLFormElement;
        this.titleInput = document.getElementById('taskTitle') as HTMLInputElement;
        this.descriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
        this.taskList = document.getElementById('taskList') as HTMLDivElement;
        this.messageDiv = document.getElementById('message') as HTMLDivElement;
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
    }

    getFormData(): { title: string; description: string } {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim()
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

    renderTasks(tasks: Task[]): void {
        if (tasks.length === 0) {
            this.taskList.innerHTML = '<p>No hay tareas registradas</p>';
            return;
        }

        this.taskList.innerHTML = tasks
            .map(task => `
                <div class="task-card">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <span>${task.completed ? 'Completada' : 'Pendiente'}</span>
                    <button data-id="${task.id}" class="delete-btn">Eliminar</button>   
                </div>
            `)
            .join('');
    }
    
    bindAddTask(handler: (title: string, description: string) => void): void {
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const { title, description } = this.getFormData();
        handler(title, description);
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
}   
