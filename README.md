# To-Do Tech Test — Ionic + Angular + Firebase

Aplicación móvil de lista de tareas construida con **Ionic Framework**, **Angular** y **Firebase** (Remote Config). Utiliza **Apache Cordova** como puente nativo para desplegar en dispositivos Android e iOS.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Ejecutar en el Navegador](#-ejecutar-en-el-navegador)
- [Android](#-android)
- [iOS](#-ios)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🧰 Tecnologías

| Tecnología | Versión |
|---|---|
| Ionic Framework | ^8.0.0 |
| Angular | ^20.0.0 |
| Apache Cordova | via `@ionic/cordova-builders` |
| Firebase / AngularFire | ^11 / ^20 |
| TypeScript | ~5.9.0 |
| Node.js | ≥18 recomendado |

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

| Requisito | Detalle |
|---|---|
| Java JDK | JDK 17 recomendado |
| Android Studio | Incluye SDK y AVD Manager |
| Android SDK | API Level 34+ recomendado |
| Variable de entorno `ANDROID_HOME` | Apuntando a la ruta del SDK |
| Variable de entorno `JAVA_HOME` | Apuntando a la ruta del JDK |

> **Configura las variables de entorno en Windows:**
> ```
> ANDROID_HOME = C:\Users\<tu-usuario>\AppData\Local\Android\Sdk
> JAVA_HOME    = C:\Program Files\Java\jdk-17
> ```
> Y agrega a `PATH`:
> ```
> %ANDROID_HOME%\tools
> %ANDROID_HOME%\platform-tools
> %JAVA_HOME%\bin
> ```

---

### Para iOS

> ⚠️ **iOS requiere macOS con Xcode instalado.** No es posible compilar para iOS desde Windows.

| Requisito | Detalle |
|---|---|
| macOS | Ventura o superior |
| Xcode | 15+ (disponible en Mac App Store) |
| Xcode Command Line Tools | `xcode-select --install` |
| CocoaPods | `sudo gem install cocoapods` |

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone (https://github.com/W17Code/to-do-tech-test.git)
cd to-do-tech-test
```

2. Instala las dependencias de Node:

```bash
npm install
```

---

## 🔥 Configuración de Firebase

Este proyecto usa **Firebase Remote Config** para controlar el feature flag `enable_categories`.

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Registra una app Web (o Android/iOS según la plataforma).
3. Copia las credenciales de configuración.
4. Edita el archivo `src/environments/environment.ts`:

```typescript
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
```

5. En Firebase Console → **Remote Config**, crea el parámetro:
   - **Nombre:** `enable_categories`
   - **Tipo:** Boolean
   - **Valor por defecto:** `true`

---

## 🌐 Ejecutar en el Navegador

Para desarrollo rápido en el navegador:

```bash
ionic serve
```

La aplicación estará disponible en `http://localhost:8100`.

---

## 🤖 Android

### Agregar la plataforma (solo la primera vez)

```bash
ionic cordova platform add android
```

### Ejecutar en emulador

1. Abre **Android Studio** → **Virtual Device Manager** y crea un AVD.
2. Inicia el emulador desde Android Studio o con:

```bash
emulator -avd <nombre-del-avd>
```

3. Ejecuta la app:

```bash
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

> 💡 Para publicar en Google Play Store, deberás firmar el APK/AAB con un keystore. Consulta la [documentación oficial de Cordova](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#signing-an-app).

---

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

> 💡 Para publicar en App Store, necesitas una cuenta de **Apple Developer Program** y configurar perfiles de aprovisionamiento. Consulta la [documentación de Cordova para iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/).

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm start` / `ionic serve` | Inicia el servidor de desarrollo en el navegador |
| `npm run build` | Compila la app Angular para producción |
| `npm test` | Ejecuta las pruebas unitarias con Karma |
| `npm run lint` | Analiza el código con ESLint |
| `ionic cordova run android` | Compila e instala en Android (emulador o dispositivo) |
| `ionic cordova run android --device` | Instala en dispositivo físico Android |
| `ionic cordova build android` | Solo compila el APK debug |
| `ionic cordova build android --prod --release` | Compila APK release de producción |
| `ionic cordova run ios` | Compila e instala en iOS (simulador) |
| `ionic cordova run ios --device` | Instala en dispositivo físico iOS |
| `ionic cordova build ios --prod --release` | Compila para distribución en App Store |

---

## 📁 Estructura del Proyecto

```
to-do-tech-test/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── home/             # Página principal
│   │   ├── models/           # Interfaces y modelos de datos
│   │   ├── pages/            # Páginas de la aplicación
│   │   ├── services/
│   │   │   └── firebase.ts   # Servicio de Firebase Remote Config
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   └── environments/
│       ├── environment.ts        # Configuración de desarrollo
│       └── environment.prod.ts   # Configuración de producción
├── platforms/                # Código nativo generado por Cordova
├── plugins/                  # Plugins de Cordova
├── resources/                # Iconos y splash screens
├── config.xml                # Configuración de Cordova
├── ionic.config.json         # Configuración de Ionic CLI
└── package.json
```

---

## 🔌 Plugins de Cordova Incluidos

| Plugin | Función |
|---|---|
| `cordova-plugin-statusbar` | Control de la barra de estado |
| `cordova-plugin-device` | Información del dispositivo |
| `cordova-plugin-splashscreen` | Pantalla de splash |
| `cordova-plugin-ionic-webview` | WebView optimizado para Ionic |
| `cordova-plugin-ionic-keyboard` | Gestión del teclado nativo |

---

## 📄 Licencia

Proyecto privado — Todos los derechos reservados.
