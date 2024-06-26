# BBDD & API

### SQL
```sql
CREATE TABLE usuarios (
	id int AUTO_INCREMENT PRIMARY KEY,
	email varchar(30) UNIQUE NOT NULL,
	nombre varchar(30) NOT NULL, 
	username varchar(30) NOT NULL,
	password varchar(200) NOT NULL,
	canciones int DEFAULT 0,
	foto varchar(900) DEFAULT 'pfp',
	closed boolean DEFAULT false
);

CREATE TABLE salas (
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    fecha date DEFAULT (CURRENT_DATE), 
    playlist varchar(100) DEFAULT 'no playlist',
    anfitrion int NOT NULL,
    FOREIGN KEY (anfitrion) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE codigos_salas (
    cod varchar(10),
    sala int PRIMARY KEY,
    cerrada boolean DEFAULT FALSE,
    FOREIGN KEY (sala) REFERENCES salas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE historial (
    id int AUTO_INCREMENT,
    sala int,
    usuario int,
    PRIMARY KEY(id),
    FOREIGN KEY (sala) REFERENCES salas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### Compilar el Proyecto
Usa Maven para compilar el proyecto. Esto descargará todas las dependencias necesarias y compilará el código fuente:

```bash
mvn clean install
```

### Ejecutar la Aplicación
Para ejecutar la aplicación, utiliza el siguiente comando de Maven:

```bash
mvn spring-boot:run
```

### Acceder a la Aplicación
Una vez que la aplicación esté en funcionamiento, puedes acceder a ella a través de tu navegador web en la siguiente URL:

```arduino
http://localhost:8080
```

### Configuración Adicional
- Archivo application.properties
Puedes configurar diferentes aspectos de la aplicación en el archivo src/main/resources/application.properties. Por ejemplo, puedes configurar la conexión a la base de datos, el puerto del servidor, etc.

```properties
# Ejemplo de configuración
spring.datasource.url=jdbc:mariadb://localhost:3306/nombre_de_tu_base_de_datos
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
server.port=8080
```

### Compilar y Empaquetar
Para compilar y empaquetar la aplicación en un archivo JAR ejecutable, utiliza el siguiente comando:

```bash
mvn clean package
```

El archivo JAR resultante se encontrará en el directorio target y puedes ejecutarlo con:

```bash
java -jar target/nombre-de-tu-archivo.jar
```
