const STORAGE_KEY = 'tasks';
export class StorageService {
    saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
    loadTasks() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    }
}
//# sourceMappingURL=StorageService.js.map