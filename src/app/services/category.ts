import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _storage: Storage | null = null;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private storage: Storage) { }

  //Inicia la base de datos local
  private async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadData();
  }

  //Carga los datos al iniciar la app
  private async loadData() {
    const categories = await this._storage?.get('categories') || [];
    this.categoriesSubject.next(categories);
  }

  //Agrega una nueva categoria
  async addCategory(category: Category) {
    const categories = [...this.categoriesSubject.getValue(), category];
    await this._storage?.set('categories', categories);
    this.categoriesSubject.next(categories);
  }

  //Actualiza una categoria
  async updateCategory(category: Category) {
    const categories = this.categoriesSubject.getValue().map(c =>
      c.id === category.id ? category : c
    );
    await this._storage?.set('categories', categories);
    this.categoriesSubject.next(categories);
  }

  //Elimina una categoria
  async deleteCategory(id: string) {
    const categories = this.categoriesSubject.getValue().filter(c => c.id !== id);
    await this._storage?.set('categories', categories);
    this.categoriesSubject.next(categories);
  }
}
