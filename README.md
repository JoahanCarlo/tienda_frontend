# Frontend - Sistema de Gestión de Tienda

## Descripción del proyecto

Aplicación frontend de un sistema de gestión de tienda, desarrollada con **React y JavaScript**. Permite administrar usuarios, clientes, productos y ventas mediante una interfaz gráfica dinámica e intuitiva.

El frontend se comunica con un backend desarrollado en Java y Spring Boot mediante servicios REST.

## Tecnologías utilizadas

- **React:** Desarrollo de interfaces mediante componentes reutilizables.
- **JavaScript:** Lógica de la aplicación.
- **HTML5:** Estructura de las vistas.
- **CSS3:** Estilos de la aplicación.
- **Bootstrap 5:** Diseño adaptable y componentes visuales.
- **Axios:** Comunicación con servicios REST.
- **DataTables:** Gestión de tablas, búsqueda, ordenamiento y paginación.
- **SweetAlert2:** Alertas, confirmaciones y notificaciones.
- **Font Awesome:** Iconos para la interfaz.

## Funcionalidades del sistema

### Autenticación
- Inicio de sesión de usuarios.
- Validación de credenciales mediante el backend.

### Gestión de usuarios
- Registrar usuarios.
- Listar usuarios.
- Actualizar información.
- Activar y desactivar usuarios.

### Gestión de clientes
- Registrar clientes.
- Consultar clientes.
- Actualizar información.
- Eliminar clientes.

### Gestión de productos
- Registrar productos.
- Consultar productos.
- Actualizar información.
- Eliminar productos.

### Gestión de ventas
- Registrar ventas.
- Consultar ventas.
- Visualizar información de las ventas.
- Generar reportes de ventas.

## Estructura del proyecto

```text
src/
├── components/
│   ├── MenuPrincipalComponent.jsx
│   ├── ListClientesComponent.jsx
│   ├── RegistrarClientesComponent.jsx
│   ├── ListProductosComponent.jsx
│   ├── ListUsuarioComponent.jsx
│   ├── RegistrarVentasComponents.jsx
│   └── ...
│
├── service/
│   ├── ClienteService.js
│   ├── ProductoService.js
│   ├── UsuarioService.js
│   ├── VentaService.js
│   └── ...
│
├── App.js
├── index.js
└── ...
```

**Descripción de las carpetas:**

- `components/`: Contiene los componentes, formularios y vistas de la aplicación.
- `service/`: Contiene los servicios encargados de realizar las peticiones HTTP al backend.
- `App.js`: Componente principal de la aplicación.
- `index.js`: Punto de entrada de React.

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js.
- npm.
- Backend del sistema desarrollado con Spring Boot.
- Editor de código, como Visual Studio Code.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar a la carpeta del frontend

```bash
cd tienda-frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

```bash
npm start
```

El frontend estará disponible en:

**http://localhost:3000**

## Conexión con el backend

El frontend consume los servicios REST del backend desarrollado con Java y Spring Boot.

| Aplicación | URL |
|---|---|
| Frontend (React) | http://localhost:3000 |
| Backend (Spring Boot) | http://localhost:8080 |

Los servicios HTTP se encuentran organizados en la carpeta `service/`, utilizando Axios para realizar las operaciones de comunicación con el backend.

**Importante:** Para utilizar todas las funcionalidades del sistema, el backend debe estar ejecutándose en `http://localhost:8080`.

## Autor

Proyecto desarrollado como práctica de desarrollo frontend con React e integración de servicios REST con Spring Boot.
