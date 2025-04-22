### 🚗 Initial D Web Project
Este proyecto es una página web interactiva dedicada al universo de Initial D, donde los usuarios pueden consultar información sobre los coches principales, pilotos legendarios y los tramos de montaña más icónicos de la serie.


Además, la aplicación consume una API que proporciona los datos dinámicamente, haciendo que el contenido esté estructurado, actualizado y fácilmente escalable.


### 🌐 Tecnologías Utilizadas


HTML5: Para la estructura del sitio.


CSS3: Para el diseño y la presentación visual.


JavaScript: Para la lógica e interactividad.


### 🔧 Funcionalidades


🔍 Consulta de Coches
Muestra información detallada (modelo, especificaciones, piloto) de los vehículos principales de la serie.


🏁 Pilotos
Biografía, estilo de conducción y coches asociados a los corredores de Initial D.


🏔️ Tramos de Carrera
Información sobre los pases de montaña reales e inspirados en la serie, como Akina, Irohazaka, etc.


🔄 Consumo de API
La app obtiene los datos en tiempo real desde una API para cargar los contenidos de coches, pilotos y tramos.


### 📦 Instalación y Uso


Clona el repositorio:


git clone https://github.com/A1EX73dev/initial-d-web.git


Abre el archivo index.html en tu navegador. La API puede tardar tiempo en cargar.


### 🔌 API


La aplicación consume una API con los siguientes endpoints (ejemplo):


GET /api/coches → Lista de coches


GET /api/pilotos → Lista de pilotos


GET /api/tramos → Lista de tramos



Ejemplo de respuesta según el endpoint:


COCHES:
{
  marca: "Toyota",
  modelo: "Sprinter Trueno GT-APEX (AE86)",
  "piloto": "Takumi Fujiwara",
  traccion: "RWD",
  imagen: "https://static.wikia.nocookie.net/initiald/images/5/54/High-Tech_Two_Tone_Trueno_3Door_AS0.png",
  equipo: ["Akina SpeedStars", "Project D"],
  descripcion: "El Toyota Sprinter Trueno GT-APEX o Hachi-Roku es uno de los vehículos más emblemáticos de la saga Initial D, conocido por su increíble rendimiento en las curvas y su potencial para el drifting. Equipado con el motor 4A-GE de 1.6 litros, de 160CV, es famoso por su revs altos y su excelente respuesta en curvas en altas revoluciones. Este modelo cuenta con tracción trasera, lo que lo convierte en un excelente aliado para las carreras de montaña y drifting."
}


TRAMOS:
{
  id: 1,
  nombre: "Monte Akina",
  nombre_japones: "",
  longitud: "8.0 km"
  imagen: "https://raw.github.com/A1EXS95/initiald-api-img/main/img/akina.png",
  puntos_clave: "5 horquillas consecutivas, cunetas, rectas largas, terraplanes pronunciados, abundantes oportunidades de adelantamiento",
  descripcion: "Akina, enclavada en Gunma, es una pista venerada que atrae a pilotos de todo el mundo. Con sus características curvas cerradas, cambios de elevacion y vistas impresionantes, personifica la esencia de las carreras de paso de montaña. Con 8 kilómetros de   longitud, esta icónica pista combina caucho y asfalto, enmarcada por imponentes montañas. Su legado y sus batallas han convertido a Akina en un circuito sagrado. Ya sea buscando la adrenalina de dominar sus curvas o simplemente disfrutando de su encanto, Akina ofrece una experiencia de touge inolvidable donde las leyendas prosperan y la velocidad habla por sí sola.",
  equipo_local: "Akina SpeedStars",
  prefectura:["Gunma"]
}


PILOTOS:
{
  id: 1",
  nombre: "Takumi Fujiwara",
  nombre_japones: "",
  marca: "Toyota"
  modelo: "Sprinter Trueno GT-APEX (AE86)",
  imagen: "https://raw.github.com/A1EXS95/initiald-api-img/main/img/takumi.png",
  descripcion: "Takumi Fujiwara es el protagonista de Initial D, un joven tranquilo e introvertido que desarrolla un talento excepcional para las carreras callejeras sin siquiera darse cuenta. Trabaja en una estación de servicio y reparte tofu para la tienda de su padre en el legendario Toyota AE86 Sprinter Trueno, lo que sin saberlo lo convierte en un conductor increíblemente hábil en los descensos del paso de Akina",
  equipo:["Akina SpeedStars", "Project D"]
}


### 👨‍💻 Autor
Desarrollado por Alex Romero.
