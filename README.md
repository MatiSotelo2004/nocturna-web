# ✦ Nocturna - Librería Online ✦

¡Bienvenidos a **Nocturna**! Una plataforma de comercio electrónico diseñada especialmente para quienes disfrutan de leer cuando el mundo duerme: amantes de la literatura de fantasía, terror, thrillers intensos, cómics y manga.

## 🎯 Misión del Proyecto

La misión de **Nocturna** es ofrecer una experiencia de compra inmersiva, elegante y con personalidad propia, alejándose de las tiendas genéricas. El proyecto busca conectar de manera fluida a lectores apasionados con su próxima gran historia nocturna, garantizando una navegación intuitiva y una interfaz optimizada para todo tipo de dispositivos.

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue desarrollado utilizando el siguiente ecosistema técnico:

*   **Core**: React + Vite
*   **Diseño y Maquetación**: React-Bootstrap + Bootstrap 5
*   **Base de Datos y Autenticación**: [Firebase](https://firebase.google.com/) (Autenticación de usuarios con Firebase Auth y base de datos con Firestore para el catálogo y usuarios).
*   **Manejo de Estados Globals**: **Context API** (Uso de `CartContext` para el flujo del carrito de compras y `SearchContext` para el filtrado global de productos).
*   **Enrutamiento**: React Router DOM
*   **Optimización de SEO y Metadatos**: React Helmet Async
*   **Iconografía**: [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Instalación y Ejecución Local

Para instalar y correr este proyecto de forma local, sigue estos pasos:

### Prerrequisitos
Tener instalado [Node.js](https://nodejs.org/) y un gestor de paquetes (`npm` o `pnpm`).

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/MatiSotelo2004/nocturna-web.git
cd nocturna-web
```

### Paso 2: Instalar las dependencias
Si usas `pnpm`:
```bash
pnpm install
```
Si usas `npm`:
```bash
npm install
```

### Paso 3: Configurar las variables de entorno
Crea un archivo llamado `.env` en la raíz del proyecto basándote en `.env.example` y rellena las credenciales correspondientes a tu proyecto de Firebase:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### Paso 4: Iniciar el servidor de desarrollo
Si usas `pnpm`:
```bash
pnpm run dev
```
Si usas `npm`:
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173` para explorar Nocturna.

---

## 🔑 Credenciales de Prueba (Evaluación / Admin)

> [!NOTE]
> Para poder acceder al panel de administrador (CRUD de productos), puedes utilizar las siguientes credenciales de prueba:
> - **Usuario / Email**: `admin@nocturna.com`
> - **Contraseña**: `admin1234`