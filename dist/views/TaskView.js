export class TaskView {
    form;
    titleInput;
    descriptionInput;
    taskList;
    messageDiv;
    searchInput;
    constructor() {
        this.form = document.getElementById('taskForm');
        this.titleInput = document.getElementById('taskTitle');
        this.descriptionInput = document.getElementById('taskDescription');
        this.taskList = document.getElementById('taskList');
        this.messageDiv = document.getElementById('message');
        this.searchInput = document.getElementById('searchInput');
    }
    getFormData() {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim()
        };
    }
    clearForm() {
        this.form.reset();
    }
    showMessage(text, type) {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `message ${type}`;
        setTimeout(() => {
            this.messageDiv.textContent = '';
            this.messageDiv.className = 'message';
        }, 3000);
    }
    renderTasks(tasks) {
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
    bindAddTask(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const { title, description } = this.getFormData();
            handler(title, description);
        });
    }
    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('delete-btn')) {
                const id = Number(target.dataset.id);
                if (confirm('¿Eliminar esta tarea?')) {
                    handler(id);
                }
            }
        });
    }
    bindSearch(handler) {
        this.searchInput.addEventListener('input', () => {
            handler(this.searchInput.value.trim());
        });
    }
}
//# sourceMappingURL=TaskView.js.map