# HITO 5

# URL DESPLIEGUE

La aplicación desplegada estará completamente accesible en la siguiente URL:
[recepita.onrender.com](https://recepita.onrender.com)

## DESCRIPTCIÓN Y JUSTIFICACIÓN DEL PaaS

Para desplegar la API REST del proyecto "Recepita", se evaluaron varias plataformas PaaS en función de los siguientes criterios:

- Compatibilidad con Docker: La aplicación utiliza contenedores Docker, por lo que era esencial que la plataforma soportara despliegues basados en Docker.

- Integración con GitHub: Se buscó una solución que permitiera integrar el repositorio de GitHub para automatizar los despliegues.

- Facilidad de uso: La plataforma debía ofrecer un flujo de trabajo sencillo para configurar y gestionar el despliegue.

- Escalabilidad automática: Era importante que el servicio pudiera escalar automáticamente según la demanda.

- Costo: Se priorizó una solución con un plan gratuito que ofrezca múltiples funcionalidades.

### OPCIONES VALORADAS

- Heroku: Ofrece soporte para Docker y despliegues automáticos desde GitHub. Sin embargo, su plan gratuito tiene limitaciones estrictas en tiempo de actividad y recursos.

- Render: Compatible con Docker, integración directa con GitHub, escalabilidad automática y un plan gratuito generoso. Además, permite configurar variables de entorno fácilmente.

- DigitalOcean App Platform: Excelente soporte para Docker y GitHub, pero su plan gratuito es más limitado que Render.

- Fly.io: Ofrece baja latencia global y soporte para Docker, pero requiere configuraciones más avanzadas.

**Decisión final:** Se eligió Render por su equilibrio entre facilidad de uso, compatibilidad con Docker, integración con GitHub y escalabilidad automática. Su plan gratuito es suficiente para las necesidades del proyecto.

**Nota:** No ha sido necesario el uso de un IaaS.

## DESCRIPCIÓN Y JUSTIFICACIÓN DE LAS HERRAMIENTAS USADAS

Para desplegar la aplicación "Recepita", se utilizaron las siguientes herramientas:

- **Docker:** La aplicación está empaquetada en un contenedor Docker mediante un archivo Dockerfile. Esto garantiza que el entorno sea consistente entre desarrollo y producción.
  **Justificación:** Docker permite empaquetar todas las dependencias necesarias para ejecutar la aplicación, evitando problemas de compatibilidad entre entornos.

- **Render:** Plataforma PaaS seleccionada para alojar la API REST.
  **Justificación:** Render permite desplegar aplicaciones basadas en Docker directamente desde un repositorio GitHub, lo que simplifica el flujo de trabajo.

- **GitHub:** Repositorio donde se aloja el código fuente del proyecto.
  **Justificación:** Render se integra directamente con GitHub, lo que facilita los despliegues automáticos cada vez que se actualiza el código.

Estas herramientas fueron elegidas por su capacidad de trabajar juntas sin necesidad de configuraciones complejas.

## DESCRIPCIÓN DE LA CONFIGURACIÓN PARA EL DESPLIEGUE AUTOMÁTICO

Con el fichero [Dockerfile](../../Dockerfile) se construye la imagen Docker de la aplicación
