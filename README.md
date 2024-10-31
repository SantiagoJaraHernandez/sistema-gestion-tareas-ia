# Gestión de Tareas con IA

Este es un sistema de gestión de tareas que utiliza Inteligencia Artificial (IA) para la priorización automática de tareas. El proyecto está construido con un backend en Node.js utilizando Express.js y una base de datos PostgreSQL, mientras que el frontend está desarrollado con React.js.

## Descripción del Proyecto

El sistema permite a los usuarios:

- Crear, leer, actualizar y eliminar (CRUD) tareas.
- Asignar fechas de entrega, importancia y tiempo estimado de finalización para cada tarea.
- Utilizar IA para sugerir la priorización automática de las tareas basándose en la información proporcionada (importancia, tiempo estimado y fechas límite).

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construir aplicaciones web.
- **Sequelize**: ORM para la gestión de la base de datos PostgreSQL.
- **PostgreSQL**: Sistema de base de datos relacional.

### Frontend
- **React.js**: Biblioteca para la construcción de interfaces de usuario.
- **Axios**: Cliente HTTP para hacer peticiones a la API del backend.

### IA
- **Bibliotecas IA (por definir)**: Usaremos bibliotecas de aprendizaje automático en Node.js para la priorización automática de tareas, como TensorFlow.js o Brain.js.

## Estructura del Proyecto

```bash
gestion-tareas-ia/
│
├── backend/            # Lógica del servidor y API REST
│   ├── src/
│   │   ├── controllers/  # Controladores para las rutas
│   │   ├── models/       # Modelos de Sequelize para la BD
│   │   ├── config.js     # Configuración de la base de datos
│   │   ├── index.js      # Archivo principal del servidor
│   │   └── routes.js     # Rutas de la API
│   ├── .env              # Variables de entorno
│   └── package.json      # Dependencias y scripts
│
└── frontend/           # Interfaz de usuario
    ├── public/         
    ├── src/            # Componentes React
    ├── package.json    # Dependencias y scripts



