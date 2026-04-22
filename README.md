# To-Do Tech Test — Ionic + Angular + Firebase

Aplicación móvil de lista de tareas construida con **Ionic Framework**, **Angular** y **Firebase** (Remote Config). Utiliza **Apache Cordova**.

🚀 **¿Quieres probar la app ya?** [**Descargar APK para Android (Google Drive)**](https://drive.google.com/file/d/12_1YPml1ekcNkTMlLxU6ke9Sh-tHwKja/view?usp=drive_link)

---

## 🧰 Tecnologías

| Tecnología          | Versión | Detalle                       |
| ------------------- | ------- | ----------------------------- |
| **Ionic Framework** | ^8.0.0  | UI Components & Framework     |
| **Angular**         | ^20.0.0 | Aplicación Base & Lógica      |
| **Cordova**         | ^12.0.0 | Acceso Nativo                 |
| **Firebase**        | ^11.0.0 | Remote Config & Configuración |
| **TypeScript**      | ~5.9.0  | Tipado Estático               |
| **Storage**         | ^4.0.0  | Persistencia Local            |

---

## ✅ Requisitos Previos

### General

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente:

```bash
npm install -g @ionic/cli
```

- [Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/):

```bash
npm install -g cordova
```

---

### Para Android

| Requisito                          | Detalle                     |
| ---------------------------------- | --------------------------- |
| Java JDK                           | JDK 17 recomendado          |
| Android Studio                     | Incluye SDK y AVD Manager   |
| Android SDK                        | API Level 34+ recomendado   |
| Variable de entorno `ANDROID_HOME` | Apuntando a la ruta del SDK |
| Variable de entorno `JAVA_HOME`    | Apuntando a la ruta del JDK |

> **Configura las variables de entorno en Windows:**
>
> ```
> ANDROID_HOME = C:\Users\<tu-usuario>\AppData\Local\Android\Sdk
> JAVA_HOME    = C:\Program Files\Java\jdk-17
> ```
>
> Y agrega a `PATH`:
>
> ```
> %ANDROID_HOME%\tools
> %ANDROID_HOME%\platform-tools
> %JAVA_HOME%\bin
> ```

---

### Para iOS

> ⚠️ **iOS requiere macOS con Xcode instalado.** No es posible compilar para iOS desde Windows.

| Requisito                | Detalle                           |
| ------------------------ | --------------------------------- |
| macOS                    | Ventura o superior                |
| Xcode                    | 15+ (disponible en Mac App Store) |
| Xcode Command Line Tools | `xcode-select --install`          |
| CocoaPods                | `sudo gem install cocoapods`      |

---

## 📦 Instalación

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/W17Code/to-do-tech-test.git
    cd to-do-tech-test
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

---

## 🔥 Configuración de Firebase

Este proyecto utiliza **Firebase Remote Config** para controlar características dinámicas.

1.  Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2.  Registra una aplicación Web y copia las credenciales.
3.  Configura `src/environments/environment.ts`:
    `typescript
export const environment = {
  production: false,
    firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
    }
};
    `

4.  En Firebase Console → **Remote Config**, crea el parámetro:
    - **Nombre:** `enable_categories`
    - **Tipo:** Boolean
    - **Valor por defecto:** `true`

---

## 🚀 Ejecución

### Navegador (Desarrollo)

```bash
ionic serve
```

### Android

```bash
# Añadir plataforma (solo una vez)
ionic cordova platform add android

# Ejecutar en dispositivo/emulador
ionic cordova run android
```

### Ejecutar en dispositivo físico

1. Activa las **Opciones de desarrollador** en tu Android:
   - Ve a **Ajustes → Acerca del teléfono** y toca 7 veces en **Número de compilación**.
2. Habilita la **Depuración USB** dentro de las Opciones de desarrollador.
3. Conecta el dispositivo por USB y confirma el permiso de depuración.
4. Verifica que el dispositivo es detectado:

```bash
adb devices
```

5. Ejecuta la app:

```bash
ionic cordova run android --device
```

### Compilar APK sin instalar

```bash
ionic cordova build android
```

El APK se genera en:

```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Compilar APK de producción (release)

```bash
ionic cordova build android --prod --release
```

## 🍎 iOS

> ⚠️ **Requiere macOS con Xcode instalado.**

### Agregar la plataforma (solo la primera vez)

```bash
ionic cordova platform add ios
```

Instala los pods de CocoaPods:

```bash
cd platforms/ios
pod install
cd ../..
```

### Ejecutar en simulador

```bash
ionic cordova run ios
```

Para seleccionar un simulador específico:

```bash
ionic cordova run ios --target="iPhone 15"
```

Listar simuladores disponibles:

```bash
xcrun simctl list devices
```

### Ejecutar en dispositivo físico

1. Conecta el iPhone/iPad por USB.
2. Confía en la computadora desde el dispositivo cuando se te solicite.
3. Abre el proyecto en Xcode para configurar el **Team de firma**:

```bash
open platforms/ios/to-do-tech-test.xcworkspace
```

4. En Xcode → **Signing & Capabilities**, selecciona tu Apple Developer Account.
5. Ejecuta la app:

```bash
ionic cordova run ios --device
```

### Compilar para producción (release)

```bash
ionic cordova build ios --prod --release
```

---

## 📜 Scripts Disponibles

| Comando                                        | Descripción                                           |
| ---------------------------------------------- | ----------------------------------------------------- |
| `npm start` / `ionic serve`                    | Inicia el servidor de desarrollo en el navegador      |
| `npm run build`                                | Compila la app Angular para producción                |
| `npm test`                                     | Ejecuta las pruebas unitarias con Karma               |
| `npm run lint`                                 | Analiza el código con ESLint                          |
| `ionic cordova run android`                    | Compila e instala en Android (emulador o dispositivo) |
| `ionic cordova run android --device`           | Instala en dispositivo físico Android                 |
| `ionic cordova build android`                  | Solo compila el APK debug                             |
| `ionic cordova build android --prod --release` | Compila APK release de producción                     |
| `ionic cordova run ios`                        | Compila e instala en iOS (simulador)                  |
| `ionic cordova run ios --device`               | Instala en dispositivo físico iOS                     |
| `ionic cordova build ios --prod --release`     | Compila para distribución en App Store                |

---

## 📁 Estructura del Proyecto

```
src/app/
├── components/          # Componentes reutilizables (Modales, etc.)
│   ├── add-task-modal/  # Modal de creación/edición de tareas
│   └── add-category-modal/
├── models/              # Interfaces TypeScript (Task, Category)
├── pages/               # Páginas principales de la app
│   └── tasks/           # Lista de tareas principal (Lógica y UI)
├── services/            # Servicios de negocio
│   ├── firebase.ts      # Integración Remote Config
│   ├── task.ts          # Gestión de tareas y Storage
│   └── category.ts      # Gestión de categorías
└── app.module.ts        # Configuración de módulos e inyecciones
```

---

## 🛠 Solución de Problemas

### Errores de Binding en Templates

Si ves errores como `error NG8002: Can't bind to 'property' since it isn't a known property of 'element'`, asegúrate de que el componente esté declarado en un módulo que importe `IonicModule` y `FormsModule`.

### Problemas con Cordova y Android

- **ADB Unresponsive**: Si el comando se queda colgado, intenta reiniciar el servidor adb: `adb kill-server` seguido de `adb start-server`.
- **Java Version**: Asegúrate de que `java -version` devuelva la versión 17. Las versiones más recientes pueden causar incompatibilidades con Cordova.

### Optimización en Producción

Para compilar una versión final optimizada:

```bash
ionic cordova build android --prod --release
```
