# Xanadu - Master

<p>El cliente master del portal Xanadu despliega todas las funciones administrativas dadas a los master, que actúan como los administradores principales de la aplicación y de los participantes que se encuentran a su cargo.</p>

<h1>Requisitos</h1>
  <ul>
    <li>Angular 6: Se recomienda mantener esta versión para evitar problemas de compilación o de compatibilidad con varios de los módulos de apoyo que se usan en el
    sistema.</li>
    <li>TypeScript 3.1: No debería presentarse ningún problema al usar un versión superior, aun así, angular/cli suele presentar problemas al momento de encontrar
    versiones diferentes de las dependencias declaradas, por tanto es normalmente necesario hacer los cambios pertinentes en el archivo package.json si se desea hacer
    algún cambio de este estilo</li>
    <li>angular/cli 6.1</li>
    <li>rxjs 6.1: Para algunas operaciones http. El módulo se instala automáticamente con la compilación normal del sistema y se puede configurar la versión instalada
    en package.json.</li>
  </ul>
  
  <p>Cualquier servidor de aplicaciones puede usarse para exponer el cliente, siempre y cuando soporte aplicaciones de una sola página como Angular (One-page
  aplications). Apache puede soportar este tipo de aplicaciones con su debida configuración. Lamentablemente, la aplicación no cuenta con un builder personalizado en
  el momento, por tanto hay que hacer el proceso de despliegue a mano.</p>

<h1>Configuración</h1>
  <p>El proyecto está compuesto por los siguientes elementos importantes:</p>
    <ul>
      <li>dist</li>
      <li>package.json</li>
      <li>node_modules</li>
      <li>src</li>
    </ul>
  <p>Otros archivos y carpetas presentes están asociados con la configuración de angular o de typescript y se recomienda no modificarlos.</p>
  <p>package.json es el archivo de configuración de Node.js. En general no es necesario manipularlo, pero varios errores de compilación pueden solucionarse si se edita
  la sección Dependencies cuando un error con la versión de los componentes requeridos por el servidor se presenta.</p>
  <p>La carpeta node_modules se genera al compilar el sistema, no debe manipularse esta carpeta. El proyecto se encuentra en el repositorio con la última versión
  compilada estable, pero se recomienda borrar la carpeta y recompilar el proyecto como se explica en secciones posteriores.</p>

  <h2>Carpeta dist</h2>
    <p>La carpeta dist contiene el último build estable de la aplicación, aunque se recomienda borrar su contenido y compilar de nuevo al momento de desplegar. La
    carpeta también contiene el archivo bs-config.json que permite desplegar el cliente usando el servidor
    <a href="https://www.npmjs.com/package/lite-server">lite-server</a>. Esta configuración es funcional pero no es necesario usarla.</p>

  <h2>Carpeta src</h2>
    <p>src contiene los archivos fuentes del cliente, y está distribuida de la siguiente manera:</p>
    <ul>
      <li>index.html</li>
      <li>styles.css</li>
      <li>favicon.ico</li>
      <li>app</li>
      <li>assets</li>
    </ul>
    <p>Otras carpetas y archivos están asociadas a la configuración y compilación de Angular y no deberían modificarse directamente. La carpeta environments está
    presente, pero este proyecto no hace uso de esta herramienta más allá del básico pre - configurado y se puede obviar.</p>
    <p>index.html es la página principal de la aplicación y el archivo a donde el servidor de aplicaciones seleccionado debe redirigir cualquier petición para que el
    portal funcione correctamente. El archivo bs-config.json hace esta configuración para el servidor lite-server. Aquí hay un posible
    <a href="https://angular.io/guide/deployment">manual</a> para la configuración de otros servidores de aplicación comunes.</p> 
    <p>En styles.css se puede configurar la hoja de estilos más general de toda la página, y que tendrán la menor relevancia al momento de ser aplicados. Para cambios
    más específicos, es necesario ir a las hojas de estilo propias de cada componente.</p>
    <p>favicon.ico es el icono principal de la app. Se puede reemplazar por un archivo con el mismo nombre para actualizar el icono automáticamente.</p>
    <p>La carpeta assets contiene todos los elementos gráficos y las fuentes usadas en la vista web de la aplicación.</p>

  <h2>Carpeta app</h2>
    <p>La carpeta app contiene los archivos fuentes de todos los componentes que construyen el portal. Todos los componentes de la aplicación tienen la misma
    distribución:</p>
    <ul>
      <li>component.ts: Es el archivo principal y quien construye y expone toda la funcionalidad.</li>
      <li>component.html: Es la vista html del componente y la que finalmente se inyecta en el index y se muestra en el browser.</li>
      <li>component.css: Es la fuente de los estilos usados en la vista html del componente.</li>
    </ul>
    <p>En la raíz de la carpeta se encuentran los tres archivos (principal, html y estilos) de los componentes master y principal. Ambos componentes construyen el
    login y el menú principal de la aplicación. Adicionalmente, cada sub – carpeta dentro de app contiene uno o más componentes asociados a una funcionalidad
    específica:</p>
    <ul>
      <li>Participantes</li>
      <li>Grupos</li>
      <li>Registro</li>
      <li>Expansiones</li>
    </ul>
    <p>La sub – carpeta services contiene servicios, es decir, componentes que no tienen una vista web. Todos los servicios del portal tienen la función de hacer
    peticiones http al servidor general y están organizados según las mismas funcionalidades de sus componentes homónimos. La excepción es el servicio
    configuration.service.ts, que puede ser modificado para configurar elementos como la ruta y puerto del servidor general.</p>
    
<h1>Inicialización</h1>
  <p>El proyecto puede ser compilado usando el builder por defecto de angular/cli. En el proyecto base se encuentra la última compilación estable en la carpeta dist,
  pero si se desea hacer una compilación de ceros o si se han hecho cambios, es necesario:</p>
  <ol>
    <li>Recompilar los modulos npm abriendo una ventana de comando en la carpeta raíz y ejecutando el comando npm install</li>
    <li>Una vez se haya recreado la carpeta node_modules es posible, en la misma carpeta raíz, ejecutar el comando ng build –prod</li>
  </ol>
  <p>Esto dejará en la carpeta dist todos los archivos del portal tal cual como se deben colocar en el servidor de aplicaciones. Hay que recordar que es importante
  configurar el servidor para que redireccione todas las peticiones al archivo index.html</p>
