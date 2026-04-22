import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/app.models';

//Paleta de colores predefinidos
export const COLOR_PALETTE: string[] = [
  '#EF4444', // Rojo
  '#F97316', // Naranja
  '#F59E0B', // Ámbar
  '#EAB308', // Amarillo
  '#22C55E', // Verde
  '#14B8A6', // Teal
  '#3B82F6', // Azul
  '#6366F1', // Indigo
  '#A855F7', // Púrpura
  '#EC4899', // Rosa
  '#78716C', // Gris
  '#06B6D4', // Cyan
];

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
  standalone: false,
})
export class AddCategoryModalComponent implements OnInit {
  @Input() category: Category | null = null; // Si viene una categoría, es modo edición

  categoryName: string = '';
  selectedColor: string = COLOR_PALETTE[0];
  colors: string[] = COLOR_PALETTE;
  isEditing: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    //Si recibe una categoría existente, pre-llena los campos
    if (this.category) {
      this.isEditing = true;
      this.categoryName = this.category.name;
      this.selectedColor = this.category.color || COLOR_PALETTE[0];
    }
  }

  //Cierra el modal sin guardar
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //Valida y envía los datos de la categoría
  save() {
    const name = this.categoryName.trim();
    if (!name) return;

    const result: Category = {
      id: this.category?.id || Date.now().toString(),
      name: name,
      color: this.selectedColor
    };

    this.modalCtrl.dismiss(result, 'save');
  }
}
