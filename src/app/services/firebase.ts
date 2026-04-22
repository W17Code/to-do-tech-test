import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private categoriesEnabledSubject = new BehaviorSubject<boolean>(false);
  public categoriesEnabled$ = this.categoriesEnabledSubject.asObservable();


  constructor() {
    this.initRemoteConfig();
  }


  private async initRemoteConfig() {
    const app = initializeApp(environment.firebase);
    const remoteConfig = getRemoteConfig(app);

    //Establece los valores por defecto si no hay conexion con firebase
    remoteConfig.defaultConfig = {
      'categories_enabled': false
    };

    try {
      //Activa la configuracion remota
      await fetchAndActivate(remoteConfig);
      //Obtiene el valor de la configuracion remota
      const isEnabled = getValue(remoteConfig, 'categories_enabled').asBoolean();
      this.categoriesEnabledSubject.next(isEnabled);

    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  }
}
