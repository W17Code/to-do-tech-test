export interface Category {
    id: string;
    name: string;
    color?: string;
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    categoryId?: string;
}

export const CATEGORIES: Category[] = [
    { id: 'work', name: 'Trabajo', color: '#4caf50' },
    { id: 'home', name: 'Hogar', color: '#2196f3' },
    { id: 'shopping', name: 'Compras', color: '#ff9800' },
    { id: 'personal', name: 'Personal', color: '#e91e63' },
];