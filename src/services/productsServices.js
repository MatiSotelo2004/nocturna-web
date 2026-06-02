const URL_PROD = "/data/productos.json";

//OBTENER PRODUCTOS CON FETCH
export const getProducts = async () =>{
    try{
        const respuesta = await fetch(URL_PROD);
        if(!respuesta.ok){
          throw new Error("No se puedo cargar la información de los productos");
        }
        return await respuesta.json();
    }catch(error){
        console.error("Error en getProducts:", error);
        throw error;
    }
}

//OBTENER PRODUCTO EN ESPECIFICO

export const getProductById = async (id) => {
  const prodId = parseInt(id);
  const productos = await getProducts();
  const encontrado = productos.find((p) => p.id === prodId);
  if (!encontrado) {
    throw new Error("No se pudo encontrar el producto");
  }
  return encontrado;
};
