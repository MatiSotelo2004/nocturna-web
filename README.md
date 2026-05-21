# ✦ Nocturna - Librería Online ✦

¡Bienvenidos a **Nocturna**! Este es mi proyecto desarrollado para la preentrega del curso de **React JS**. Se trata de una e-commerce pensada especialmente para quienes disfrutamos de leer cuando el mundo duerme: amantes de la literatura de fantasía, terror, thrillers intensos y buen manga.

## 🚀 Sobre el proyecto

Este proyecto nació con el objetivo de aplicar los conceptos fundamentales de React de una manera práctica y real. En lugar de hacer una tienda genérica, quise darle una identidad oscura, elegante y con mucha personalidad.
¡Es muy emocionante ver cómo todo cobra vida con unas pocas líneas de código!

### 🛠️ Lo que fui aprendiendo e implementando:

* **Componentes Reutilizables:** Estructuré la web dividiéndola en piezas lógicas (como `Item`, `ItemList`, `Header`, `Footer`), aprendiendo a pasarles datos de forma eficiente a través de *props*.
* **Manejo de Estado (`useState`) y Efectos (`useEffect`):** Implementé la carga de productos simulando una base de datos real mediante un archivo `productos.json` local usando `fetch`.
* **Enrutamiento Dinámico (`react-router-dom`):** Logré que la aplicación se sienta como una verdadera *Single Page Application* (SPA), navegando fluidamente entre la página de Inicio, el Catálogo completo y el Detalle personalizado de cada libro mediante rutas con parámetros (`/producto/:id`).
* **Contexto Global (`Context API`):** Uno de los mayores desafíos del curso. Creé un `CartContext` centralizado para manejar el estado del carrito de compras desde cualquier rincón de la app sin tener que pasar funciones de componente en componente (*prop drilling*).
* **Estilos Modernos:** Utilicé **Tailwind CSS v4** para armar una interfaz oscura, limpia y con animaciones suaves al pasar el cursor sobre las portadas de los libros.