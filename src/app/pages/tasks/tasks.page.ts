import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseService } from 'src/app/services/firebase';
import { TaskService } from 'src/app/services/task';
import { CategoryService } from 'src/app/services/category';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Task } from 'src/app/models/app.models';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddTaskModalComponent } from 'src/app/components/add-task-modal/add-task-modal.component';
import { AddCategoryModalComponent } from 'src/app/components/add-category-modal/add-category-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  private destroyRef = inject(DestroyRef);
  categoriesEnabled$!: Observable<boolean>;
  filteredTasks$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  //Subject reactivo para el filtro de categoría seleccionada
  private selectedCategorySubject = new BehaviorSubject<string>('all');
  selectedCategoryId: string = 'all';

  //Mapas para buscar nombre y color de una categoría por su ID
  categoryMap: { [id: string]: string } = {};
  colorMap: { [id: string]: string } = {};

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private firebaseService: FirebaseService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.categoriesEnabled$ = this.firebaseService.categoriesEnabled$
    this.categories$ = this.categoryService.categories$;

    //Mantiene mapas actualizados de categorías para mostrar nombres y colores
    this.categories$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(cats => {
      this.categoryMap = {};
      this.colorMap = {};
      cats.forEach(c => {
        this.categoryMap[c.id] = c.name;
        if (c.color) this.colorMap[c.id] = c.color;
      });
    });

    this.filteredTasks$ = combineLatest([
      this.taskService.tasks$,
      this.categoriesEnabled$,
      this.categoryService.categories$,
      this.selectedCategorySubject
    ]).pipe(
      map(([tasks, isEnabled, , selectedId]) => {
        if (!isEnabled || selectedId === 'all') return tasks;
        return tasks.filter(t => t.categoryId === selectedId);
      })
    )
  }

  //Se llama cuando el usuario cambia de categoría en el segment
  onCategoryChange() {
    this.selectedCategorySubject.next(this.selectedCategoryId);
  }

  //Wrapper: alterna el estado de una tarea
  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  //Wrapper: elimina una tarea
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  //Abre el modal para agregar una nueva tarea
  async presentAddTask() {
    const isEnabled = await firstValueFrom(this.categoriesEnabled$);
    const categories = await firstValueFrom(this.categories$);

    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      componentProps: {
        categories: categories,
        categoriesEnabled: isEnabled
      }
    });

    await modal.present();

    //Espera a que el modal se cierre y recibe los datos
    const { data, role } = await modal.onDidDismiss<Task>();

    if (role === 'save' && data) {
      this.taskService.addTask(data);
    }
  }

  //Abre el modal para editar una tarea existente
  async presentEditTask(task: Task) {
    const isEnabled = await firstValueFrom(this.categoriesEnabled$);
    const categories = await firstValueFrom(this.categories$);

    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      componentProps: {
        task: task,
        categories: categories,
        categoriesEnabled: isEnabled
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss<Task>();

    if (role === 'save' && data) {
      this.taskService.updateTask(data);
    }
  }

  //Muestra opciones al tocar una tarea (editar/eliminar)
  async taskActionSheet(task: Task) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: task.title,
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.presentEditTask(task);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.taskService.deleteTask(task.id);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  //Abre el modal para agregar una nueva categoría
  async presentAddCategory() {
    const modal = await this.modalCtrl.create({
      component: AddCategoryModalComponent
    });

    await modal.present();
    //Espera a que el modal se cierre y recibe los datos
    const { data, role } = await modal.onDidDismiss<Category>();

    if (role === 'save' && data) {
      this.categoryService.addCategory(data.name, data.color);
    }
  }

  //Abre el modal para editar una categoría existente
  async presentEditCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: AddCategoryModalComponent,
      componentProps: {
        category: category
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss<Category>();

    if (role === 'save' && data) {
      this.categoryService.updateCategory(data);
    }
  }

  //Abre el action sheet al tocar una categoria ya seleccionada
  onCategoryTap(cat: Category) {
    if (this.selectedCategoryId === cat.id) {
      this.categoryActionSheet(cat);
    }
  }

  async categoryActionSheet(category: Category) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Gestionar: ${category.name}`,
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.presentEditCategory(category);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.categoryService.deleteCategory(category.id);
            if (this.selectedCategoryId === category.id) {
              this.selectedCategoryId = 'all';
              this.onCategoryChange();
            }
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

}
