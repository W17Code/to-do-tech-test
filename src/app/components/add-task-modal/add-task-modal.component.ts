import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, Task } from 'src/app/models/app.models';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  standalone: false,
})
export class AddTaskModalComponent implements OnInit {
  //Datos que recibe el modal desde la página que lo abre
  @Input() categories: Category[] = [];
  @Input() categoriesEnabled: boolean = false;
  @Input() task: Task | null = null; // Si viene una tarea, es modo edición

  taskTitle: string = '';
  selectedCategoryId: string = '';
  isEditing: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    //Si recibe una tarea existente, pre-llena los campos
    if (this.task) {
      this.isEditing = true;
      this.taskTitle = this.task.title;
      this.selectedCategoryId = this.task.categoryId || '';
    }
  }

  //Cierra el modal sin guardar
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //Valida y envía los datos de la tarea al cerrar el modal
  save() {
    const title = this.taskTitle.trim();
    if (!title) return;

    const task: Task = {
      id: this.task?.id || Date.now().toString(),
      title: title,
      completed: this.task?.completed || false,
      categoryId: this.selectedCategoryId || undefined
    };

    this.modalCtrl.dismiss(task, 'save');
  }
}
