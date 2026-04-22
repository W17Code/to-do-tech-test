import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Category, Task } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _storage: Storage | null = null;

  //Observable que contiene todas las tareas
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  //Observable que contiene todas las categorias
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(
    private storage: Storage
  ) { }

  //Inicia la base de datos local
  private async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadData();
  }

  //Carga los datos al iniciar la app
  private async loadData() {
    const tasks = await this._storage?.get('tasks') || []
    const categories = await this._storage?.get('categories') || []

    //Carga o actualiza los datos a los observables
    this.tasksSubject.next(tasks);
    this.categoriesSubject.next(categories);
  }

  //Agrega una nueva tarea
  async addTask(task: Task) {
    const tasks = [...this.tasksSubject.getValue(), task];
    await this._storage?.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  //Alterna el estado de una tarea (completed o no)
  async toggleTask(id: string) {
    const tasks = this.tasksSubject.getValue().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    await this._storage?.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  //Actualiza una tarea existente
  async updateTask(task: Task) {
    const tasks = this.tasksSubject.getValue().map(t =>
      t.id === task.id ? task : t
    );
    await this._storage?.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  //Elimina una tarea
  async deleteTask(id: string) {
    const tasks = this.tasksSubject.getValue().filter(t => t.id !== id);
    await this._storage?.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }
}
