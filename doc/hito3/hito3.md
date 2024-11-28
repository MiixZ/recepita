# HITO 3

## ✏️ ELECCIÓN DE FRAMEWORK PARA SERVICIOS

En este proyecto, el framework elegido para la creación de servicios RESTful es **Express.js**. Express es un framework minimalista y flexible para Node.js que proporciona una capa de abstracción sobre el servidor HTTP nativo de Node.js, simplificando la creación de aplicaciones web y APIs RESTful. Express es ampliamente utilizado en la comunidad de Node.js y ofrece una amplia gama de características y middleware para facilitar el desarrollo de aplicaciones web.

### Justificación:

Express.js es ideal para este proyecto porque:

- Es un framework ligero y minimalista que permite crear aplicaciones web y APIs RESTful de forma rápida y sencilla.
- Proporciona una API simple y fácil de usar para definir rutas, middleware y controladores.
- Ofrece una amplia gama de middleware y plugins para añadir funcionalidades adicionales a la aplicación.
- Es ampliamente utilizado en la comunidad de Node.js y cuenta con una gran cantidad de recursos y documentación disponibles.

### Alternativas consideradas:

- **Koa.js**: Koa es un framework web moderno y minimalista para Node.js que se basa en generadores y promesas para simplificar el manejo de solicitudes y respuestas. Aunque Koa ofrece una sintaxis más moderna y elegante que Express, su adopción en la comunidad es menor y puede ser menos compatible con ciertas bibliotecas y middleware.
- **Fastify**: Fastify es un framework web rápido y eficiente para Node.js que se centra en el rendimiento y la escalabilidad. Fastify es ideal para aplicaciones web de alto rendimiento y APIs RESTful que requieren una baja latencia y un alto rendimiento. Sin embargo, Fastify puede ser más complejo de configurar y utilizar que Express para proyectos más simples.

## DISEÑO DE LA API REST

Para el diseño de la API RESTful, se ha optado por una arquitectura de capas que separa las responsabilidades y facilita la escalabilidad y mantenibilidad del código. La arquitectura de capas consta de las siguientes capas:

0. **Capa de Rutas**: Esta capa se encarga de definir las rutas de la API y de asignar las solicitudes HTTP a los controladores correspondientes. Las rutas se definen utilizando el framework _Express_ y se comunican con los controladores para procesar las solicitudes.

1. **Capa de Controladores**: Esta capa se encarga de manejar las solicitudes HTTP y las respuestas correspondientes. Los controladores son responsables de la lógica de negocio y la interacción con la capa de servicios.

2. **Capa de Servicios**: Esta capa se encarga de implementar la lógica de negocio de la aplicación. Los servicios encapsulan la lógica de negocio y se comunican con la capa de acceso a datos para realizar operaciones CRUD en la base de datos.

3. **Capa de Acceso a Datos**: Esta capa se tendrá en cuenta cuando se implemente la base de datos. La capa de acceso a datos se encarga de interactuar con la base de datos y realizar operaciones CRUD en las entidades de la aplicación. Por ahora, se trabaja con _datos en memoria_.

4. **Capa de Modelos**: Esta capa define los modelos de datos que representan las entidades de la aplicación. Los modelos se utilizan para mapear los datos de la base de datos a objetos JavaScript y viceversa.

Por el momento, se han implementado las capas de rutas, controladores y modelos para las recetas y los ingredientes. En futuras iteraciones, se implementarán las capas de servicios y acceso a datos para completar la arquitectura de capas. Estos _modelos_ están definidos en la carpeta [models](../../src/models) y están compuesto por:

- **Ingrediente**:

  - **id**: Identificador único del ingrediente.
  - **nombre**: Nombre del ingrediente.
  - **kcalorias**: Calorías del ingrediente.
  - **macronutrientes**: Macronutrientes del ingrediente (interfaz auxiliar).
  - **peso**: Peso del ingrediente.

- **Receta**:
  - **id**: Identificador único de la receta.
  - **nombre**: Nombre de la receta.
  - **ingredientes**: Lista de ingredientes de la receta.
  - **recomendacion_nutricional**: Recomendación nutricional de la receta.
  - **kcalorias**: Calorías totales de la receta.

La lógica de negocio recaerá principalmente en el cálculo de las calorías totales de una receta, así como en la recomendación nutricional de la misma cuando se añadan los usuarios a la aplicación. Para ello, se ha definido una interfaz `Macronutrientes` en el archivo [macronutrientes.ts](../../src/models/macronutrientes.ts) que define los macronutrientes de un ingrediente.

Por ahora, sólo estarán habilitadas la opción de obtener datos, no la de modificarlos, añadirlos o eliminarlos; que se implementarán cuando esté disponible la base de datos.

Habrán tres routers principales, uno el router general que se encargará de manejar las rutas de la API, y dos routers secundarios que se encargarán de manejar las rutas de los ingredientes y las recetas. Estos routers se encuentran en la carpeta [routes](../../src/routes) y se encargan de asignar las solicitudes HTTP a los controladores correspondientes.

El router general, a su vez, se encargará de manejar los errores de las rutas desconocidas que lleguen (que no sean `/ingredientes` o `/recetas`), devolviendo un mensaje de error y un código de estado 404.

## 🧪 BIBLIOTECA DE LOGS

Para la gestión de logs en la aplicación, se ha elegido la biblioteca **Winston**. Winston es una biblioteca de registro flexible y versátil para Node.js que permite registrar mensajes de registro en varios niveles de severidad y en varios destinos, como la consola, archivos de registro y servicios de terceros. Winston es ampliamente utilizado en la comunidad de Node.js y ofrece una amplia gama de características y opciones de configuración para adaptarse a las necesidades de la aplicación.

Una salida de ejemplo de los logs, al ejecutar los tests quedaría:

```bash
info: Fetching all recipes {"service":"user-service","timestamp":"2024-11-28 23:39:08"}
info: Fetching recipe with id: 1 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching recipe with id: 0 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
error: Recipe with id 0 not found {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching recipes with ingredient: cebolla {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching recipes with ingredient: cebolla {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching recipes with ingredient: queso {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
warn: No recipes found with ingredient: queso {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching all ingredients {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Filtered ingredients by name, total: 19 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching ingredient with id: 1 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching all ingredients {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Filtered ingredients by name, total: 19 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching ingredient with id: 0 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching all ingredients {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Filtered ingredients by name, total: 19 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
warn: Ingredient with id 0 not found {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching ingredients with name containing: cebolla {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching all ingredients {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Filtered ingredients by name, total: 19 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching ingredients with name containing: noIngrediente {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Fetching all ingredients {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
info: Filtered ingredients by name, total: 19 {"service":"user-service","timestamp":"2024-11-28 23:39:09"}
warn: No ingredients found with name containing: noIngrediente {"service":"user-service","timestamp":"2024-11-28 23:39:09"}

```

### Justificación:

Winston es ideal como biblioteca de logs porque:

- Ofrece una API simple y fácil de usar para registrar mensajes de registro en varios niveles de severidad.
- Permite configurar múltiples transportes para enviar mensajes de registro a diferentes destinos, como la consola, archivos de registro y servicios de terceros.

### Alternativas consideradas:

- **Bunyan**: Bunyan es una biblioteca de registro similar a Winston que ofrece una API simple y flexible para registrar mensajes de registro en varios destinos. Sin embargo, Winston es más ampliamente utilizado y ofrece una mayor variedad de características y opciones de configuración.
- **Pino**: Pino es una biblioteca de registro rápida y eficiente para Node.js que se centra en el rendimiento y la escalabilidad. Sin embargo, Winston es más versátil y ofrece una mayor flexibilidad en la configuración y el uso.

## TESTS

Los tests fueron implementados en el [hito anterior](../hito2/hito2.md), y se han mantenido en esta iteración, ya que testeaban íntegramente la API por confusión. Para esta iteración, se han agregado más tests que testearán la parte de los ingredientes.

La salida de los tests exitoso es la siguiente:

```bash
> recepita@1.0.0 test
> jest --config jest.config.ts --verbose --silent

 PASS  tests/general.test.ts
  √ Devuelve un JSON (28 ms)
  √ Tests de recetas (5 ms)
  √ Tests de recetas fallidos (4 ms)
  √ Tests de recetas por ID (3 ms)
  √ Tests de recetas por ID fallidos (3 ms)
  √ Tests de recetas por ingrediente (3 ms)
  √ Tests de recetas por ingrediente fallidos (4 ms)
  √ Tests de recetas por ingrediente que devuelven algo (3 ms)
  √ Tests de recetas por ingrediente que devuelven algo fallidos (5 ms)
  √ Tests de ingredientes (4 ms)
  √ Tests de ingredientes fallidos (3 ms)
  √ Tests de ingredientes por ID (5 ms)
  √ Tests de ingredientes por ID fallidos (4 ms)
  √ Tests de ingredientes por nombre (4 ms)
  √ Tests de ingredientes por nombre fallidos (3 ms)

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        2.009 s
```
