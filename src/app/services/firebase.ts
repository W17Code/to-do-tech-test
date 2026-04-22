import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
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

    // Fuerza a Firebase a no usar el caché de 12 horas y descargar siempre
    remoteConfig.settings.minimumFetchIntervalMillis = 0;

    //Establece los valores por defecto si no hay conexion con firebase
    remoteConfig.defaultConfig = {
      'enable_categories': true
    };

    try {
      //Activa la configuracion remota
      await fetchAndActivate(remoteConfig);
      //Obtiene el valor de la configuracion remota
      const isEnabled = getValue(remoteConfig, 'enable_categories').asBoolean();
      this.categoriesEnabledSubject.next(isEnabled);

    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  }
}
