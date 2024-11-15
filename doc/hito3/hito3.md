# HITO 3

## ✏️ ELECCIÓN DE FRAMEWORK PARA SERVICIOS

En este proyecto, el framework elegido para la creación de servicios RESTful es **Express.js**. Express es un framework minimalista y flexible para Node.js que proporciona una capa de abstracción sobre el servidor HTTP nativo de Node.js, simplificando la creación de aplicaciones web y APIs RESTful. Express es ampliamente utilizado en la comunidad de Node.js y ofrece una amplia gama de características y middleware para facilitar el desarrollo de aplicaciones web.

## DISEÑO DE LA API POR CAPAS

Para el diseño de la API RESTful, se ha optado por una arquitectura de capas que separa las responsabilidades y facilita la escalabilidad y mantenibilidad del código. La arquitectura de capas consta de las siguientes capas:

1. **Capa de Controladores**: Esta capa se encarga de manejar las solicitudes HTTP y las respuestas correspondientes. Los controladores son responsables de la lógica de negocio y la interacción con la capa de servicios.

2. **Capa de Servicios**: Esta capa se encarga de implementar la lógica de negocio de la aplicación. Los servicios encapsulan la lógica de negocio y se comunican con la capa de acceso a datos para realizar operaciones CRUD en la base de datos.

3. **Capa de Acceso a Datos**: Esta capa se encarga de interactuar con la base de datos y realizar operaciones CRUD. La capa de acceso a datos se comunica con la base de datos para recuperar, crear, actualizar y eliminar datos.

4. **Capa de Modelos**: Esta capa define los modelos de datos que representan las entidades de la aplicación. Los modelos se utilizan para mapear los datos de la base de datos a objetos JavaScript y viceversa.
