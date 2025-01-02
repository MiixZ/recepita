# HITO 4

## ✏️ JUSTIFICACIÓN DE LA ESTRUCTURA DEL CLÚSTER

El clúster de contenedores de la aplicación se ha estructurado de la siguiente manera:

- **Backend**: El contenedor del backend de la aplicación se ha creado a partir de una imagen de Node.js. En este contenedor se ejecuta el servidor de la aplicación, que se encarga de gestionar las peticiones HTTP y de interactuar con la base de datos.
- **Base de datos**: El contenedor de la base de datos se ha creado a partir de una imagen de MariaDB/MySQL. En este contenedor se ejecuta el servidor de la base de datos, que se encarga de almacenar y gestionar los datos de la aplicación.
- **Servidor de logs**: El contenedor del servidor de logs se ha creado a partir de una imagen de Loki. En este contenedor se ejecuta el servidor de logs, que se encarga de recoger y almacenar los logs de la aplicación.
- **Servidor de Grafana**: El contenedor del servidor de Grafana se ha creado a partir de una imagen de Grafana. En este contenedor se ejecuta el servidor de Grafana, que se encarga de visualizar los logs de la aplicación para una mayor monitorización.

La estructura del clúster de contenedores de la aplicación se ha diseñado de esta manera para separar las distintas partes de la aplicación en contenedores independientes, de forma que cada contenedor tenga una única responsabilidad y sea fácil de gestionar. Además, se ha utilizado Docker Compose para definir y gestionar los contenedores de la aplicación, lo que facilita la creación, ejecución y monitorización del clúster de contenedores.

## 📦 JUSTIFICACIÓN DE LA CONFIGURACIÓN DE LOS CONTENEDORES

Estas configuraciones se encuentran en el fichero [compose.yml](../../compose.yml). La configuración de los contenedores de la aplicación se ha realizado de la siguiente manera:

- **Backend**: El contenedor del backend de la aplicación se ha configurado para exponer el puerto 3000, que es el puerto en el que se ejecuta el servidor de la aplicación. Utiliza una imagen de Node.js como base ya que la aplicación está escrita en JavaScript y se ejecuta en un entorno Node.js.

- **Base de datos**: El contenedor de la base de datos se ha configurado para exponer el puerto 3306, que es el puerto en el que se ejecuta el servidor de la base de datos. Utiliza una imagen de MariaDB como base ya que la aplicación utiliza una base de datos MySQL para almacenar los datos y **requiere menos configuración de permisos y usuarios** que MySQL de Oracle.

- **Servidor de logs**: El contenedor del servidor de logs se ha configurado para exponer el puerto 3100, que es el puerto en el que se ejecuta el servidor de logs. Utiliza una imagen de Loki como base ya que es un servidor de logs ligero y fácil de configurar, a diferencia de otros servidores de logs más complejos como Elasticsearch o Splunk.

- **Servidor de Grafana**: El contenedor del servidor de Grafana se ha configurado para exponer el puerto 3200, usando un mapeo desde el puerto 3000, que es el puerto en el que se ejecuta el servidor de Grafana. Utiliza una imagen de Grafana como base ya que es una herramienta de visualización de logs muy popular y fácil de usar, que permite crear dashboards personalizados para monitorizar los logs de la aplicación.

Adicionalmente, se ha definido una red de Docker para conectar los contenedores de la aplicación, de forma que puedan comunicarse entre sí. Esta red se ha configurado para que los contenedores se conecten automáticamente a la red al iniciarse, lo que facilita la comunicación entre los contenedores.

## 🚀 DOCUMENTACIÓN DEL DOCKERFILE

A continuación, se documenta el propósito y funcionamiento de cada instrucción del Dockerfile que se utiliza para levantar el servidor del backend, que es el principal de la aplicación. Este fichero se encuentra en la carpeta raíz del proyecto [Dockerfile](../../Dockerfile).

### Base de la imagen:

**FROM node:18**: Se utiliza una imagen oficial de Node.js en su versión 18 como base. Esta imagen incluye Node.js y npm preinstalados, lo que facilita el desarrollo y ejecución de aplicaciones JavaScript.

### Directorio de trabajo:

**WORKDIR /app**: Se establece el directorio de trabajo dentro del contenedor como /app. Todas las operaciones posteriores (como copiar archivos o ejecutar comandos) se realizarán en este directorio.

### Copia de archivos esenciales para dependencias:

**COPY package\*.json ./**: Se copian los archivos package.json y package-lock.json (si existe) desde el contexto de construcción local al directorio de trabajo del contenedor. Estos archivos contienen la configuración del proyecto y las dependencias necesarias.

### Instalación de dependencias:

**RUN npm install && npm cache clean --force**: Se instalan las dependencias definidas en el archivo package.json utilizando npm. Posteriormente, se limpia la caché de npm para reducir el tamaño final de la imagen.

### Copia del código fuente:

**COPY . .**: Se copian todos los archivos del contexto de construcción local al directorio de trabajo del contenedor. Esto incluye el código fuente de la aplicación y cualquier otro archivo necesario para su ejecución.

### Construcción de la aplicación:

RUN npm run build: Se ejecuta el script build definido en el archivo package.json. Este paso generalmente se utiliza para compilar o preparar la aplicación para producción, por ejemplo, transpilar TypeScript a JavaScript o generar archivos optimizados.

### Configuración del entorno:

ENV NODE_ENV=production: Se establece una variable de entorno llamada NODE_ENV con el valor production. Esto indica que la aplicación se ejecutará en modo producción, habilitando optimizaciones específicas y deshabilitando características innecesarias para desarrollo.

### Exposición del puerto:

**EXPOSE 3000**: Se expone el puerto 3000 del contenedor, que es donde la aplicación estará escuchando solicitudes HTTP. Este paso es informativo y no configura reglas de red por sí solo; debe combinarse con opciones al ejecutar el contenedor (como -p o --publish).

### Comando por defecto:

**CMD ["node", "dist/app.js"]**: Define el comando que se ejecutará cuando se inicie un contenedor basado en esta imagen. En este caso, se ejecuta el archivo dist/app.js con Node.js, que generalmente es el punto de entrada principal de la aplicación.

### Propósito general

Este Dockerfile está diseñado para crear una imagen Docker que empaqueta y despliega una aplicación Node.js lista para producción. Incluye pasos para instalar dependencias, compilar la aplicación, configurar un entorno optimizado para producción y exponer un puerto para que la aplicación sea accesible desde fuera del contenedor. Es ideal para entornos donde se requiere una configuración reproducible, eficiente y preparada para desplegar aplicaciones Node.js en servidores o plataformas como Kubernetes o Docker Swarm.

## 📊 DOCUMENTACIÓN DEL FICHERO DE COMPOSICIÓN

Este fichero, situado en [compose.yml](../../compose.yml), define una infraestructura completa con múltiples servicios interconectados usando Docker Compose:

### Servicios

#### backend

- **Descripción**: Este servicio representa la aplicación principal (backend) que se ejecuta en un contenedor Docker.
- **Configuración**:
  - **container_name**: `backend`: El contenedor se nombrará como `backend`.
  - **build**:
    - **context**: `.`: El contexto de construcción es el directorio actual.
    - **dockerfile**: `Dockerfile`: Se utiliza el archivo [Dockerfile](../../Dockerfile) del contexto para construir la imagen del contenedor.
  - **ports**: `"3000:3000"`: El puerto 3000 del contenedor se expone y se asigna al puerto 3000 del host.
  - **volumes**: `./src:/app/src`: Se monta el directorio local `./src` dentro del contenedor en `/app/src`, lo que permite sincronizar los cambios realizados en el código fuente.
  - **environment**: Define variables de entorno necesarias para la configuración de la base de datos:
    - `DB_HOST=db`: Dirección del servicio de base de datos.
    - `DB_PORT=3306`: Puerto donde escucha la base de datos.
    - `DB_USER=root`
    - `DB_PASSWORD=root_ps`
    - `DB_NAME=recepita`: Credenciales y nombre de la base de datos.
  - **depends_on**: Define dependencias para garantizar que los servicios `db` y `logserver` estén iniciados antes de ejecutar este servicio.
  - **networks**: `app-network`: Este servicio se conecta a la red definida como `app-network`.
  - **restart**: `always`: Configuración para reiniciar automáticamente el contenedor en caso de fallo.

#### db

- **Descripción**: Este servicio configura una base de datos utilizando la imagen oficial de MariaDB.
- **Configuración**:
  - **container_name**: `db`: El contenedor se nombrará como `db`.
  - **image**: `mariadb:latest`: Utiliza la última versión disponible de la imagen oficial de MariaDB.
  - **environment**: Configura las credenciales y parámetros iniciales para MariaDB:
    - `MYSQL_ROOT_PASSWORD=root_ps`: Contraseña del usuario root.
    - `MYSQL_DATABASE=recepita`: Nombre de la base de datos que se creará al iniciar el contenedor.
    - `MYSQL_USER=user`
    - `MYSQL_PASSWORD=user_ps`: Credenciales para un usuario adicional.
  - **ports**: `"3306:3306"`: El puerto 3306 del contenedor se expone y se asigna al puerto 3306 del host, permitiendo conexiones externas.
  - **volumes**: `dbdata:/var/lib/mariadb`: Se utiliza un volumen llamado `dbdata` para persistir los datos en `/var/lib/mariadb`, el directorio donde MariaDB almacena su información.
  - **networks**: `app-network`: Este servicio se conecta a la red definida como `app-network`.
  - **restart**: `always`: Configuración para reiniciar automáticamente el contenedor en caso de fallo.

#### Volúmenes

- **dbdata**:
  - Volumen utilizado por el servicio MariaDB (`db`) para persistir los datos almacenados en `/var/lib/mariadb`.

#### Redes

- **app-network**:
  - Red personalizada definida para conectar todos los servicios (`backend`, `db`, `logserver`, y `grafana`). Esto permite que los servicios puedan comunicarse entre sí utilizando sus nombres como direcciones.

## 📈 TESTS DEL CLÚSTER

Se ha implementado un nuevo test de propósito general que comprueba si se han levantado correctamente los contenedores. Además, se ha agregado una ejecución antes de cualquier test para levantar el clúster de contenedores. Estos cambios pueden comprobarse en el fichero [general.test.ts](../../tests/general.test.ts).

```typescript
beforeAll(() => {
  execSync("docker-compose up --build -d", { stdio: "inherit" });
});

test("Comprueba si los contenedores están levantados", async () => {
  await generalTest.checkContainers();
});
```

Un ejemplo de salida satisfactoria:

```bash
 PASS  tests/general.test.ts (8.122 s)
  √ Devuelve un JSON (33 ms)
  √ Comprueba si los contenedores están levantados (57 ms)
  √ Tests de recetas (54 ms)
  √ Tests de recetas fallidos (8 ms)
  √ Tests de recetas por ID (10 ms)
  √ Tests de recetas por ID fallidos (8 ms)
  √ Tests de recetas por ingrediente (11 ms)
  √ Tests de recetas por ingrediente fallidos (5 ms)
  √ Tests de recetas por ingrediente que devuelven algo (7 ms)
  √ Tests de recetas por ingrediente que devuelven algo fallidos (10 ms)
  √ Tests de ingredientes (6 ms)
  √ Tests de ingredientes fallidos (4 ms)
  √ Tests de ingredientes por ID (6 ms)
  √ Tests de ingredientes por ID fallidos (6 ms)
  √ Tests de ingredientes por nombre (5 ms)
  √ Tests de ingredientes por nombre fallidos (6 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        8.212 s
```

## 📦 GITHUB PACKAGES

Se ha configurado el repositorio para que acepte el [paquete publicado](https://github.com/MiixZ/recepita-package/pkgs/npm/recepita-package).
