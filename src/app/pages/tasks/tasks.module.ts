import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { AddTaskModalComponent } from 'src/app/components/add-task-modal/add-task-modal.component';
import { AddCategoryModalComponent } from 'src/app/components/add-category-modal/add-category-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule
  ],
  declarations: [TasksPage, AddTaskModalComponent, AddCategoryModalComponent]
})
export class TasksPageModule { }
