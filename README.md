# Servidor de Socket.IO

Este proyecto es un servidor de **Socket.IO** desarrollado en **Node.js**. Este servidor facilita la comunicación en tiempo real entre los clientes.

## Requisitos

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

## Instalación y Ejecución

Navega al directorio del servidor e instala las dependencias necesarias con npm:

```bash
cd server
npm install
```

### Ejecutar el Servidor
Para ejecutar el servidor, usa el siguiente comando:

```bash
node index.js
```

### Acceder al Servidor
Una vez que el servidor esté en funcionamiento, estará escuchando en el puerto configurado (por defecto, el puerto 3000). Puedes cambiar el puerto en el archivo index.js si es necesario.

### Archivos y Directorios Principales
- server/index.js: *Archivo principal del servidor donde se configura y se ejecuta el servidor de Socket.IO.*
