// Importar la librería 'fs' para manejar el sistema de archivos
const fs = require("fs");
// Declarar un array vacío para almacenar los productos y la ruta del archivo donde se guardarán los productos
let products = [];
let pathFile = "./data/products.json";
// Función para agregar un nuevo producto
const addProduct = async (title, description, price, thumbnail, code, stock) => {
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };
 // Verificar si alguno de los campos del producto es 'undefined'
  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }
 // Verificar si ya existe un producto con el mismo código
  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }
// Agregar el nuevo producto al array de productos
  products.push(newProduct);
// Escribir los productos en el archivo JSON
  await fs.promises.writeFile(pathFile, JSON.stringify(products));

};
// Función para obtener todos los productos
const getProducts = async () => {
  // Leer el archivo JSON que contiene los productos
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
  // Parsear el JSON y asignarlo al array de productos
  products = JSON.parse(productsJson) || [];
// Retornar la lista de productos
  return products;
};
// Función para obtener un producto por su ID
const getProductById = async (id) => {
  // Obtener todos los productos
  await getProducts();
  // Buscar el producto por su ID
  const product = products.find(product => product.id === id);
  // Si no se encuentra el producto, mostrar un mensaje de error y retornar
  if (!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }
  // Mostrar el producto encontrado y retornarlo
  console.log(product);
  return product;
};

// Función para actualizar un producto
const updateProduct = async (id, dataProduct) => {
  // Obtener todos los productos
  await getProducts();
  // Encontrar el índice del producto que se quiere actualizar
  const index = products.findIndex(product => product.id === id);
   // Actualizar los campos del producto con los nuevos datos proporcionados
  products[index] = {
    ...products[index],
    ...dataProduct
  }
// Escribir los productos actualizados en el archivo JSON
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};
// Función para eliminar un producto
const deleteProduct = async (id) => {
    // Obtener todos los productos
  await getProducts();
  // Filtrar los productos para excluir el que tenga el ID proporcionado
  products = products.filter(product => product.id !== id);
  // Escribir los productos restantes en el archivo JSON
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Test

//addProduct("Casco", "Casco LS2 352 Rookie Mono Mate Negro", 128700, "https://ls2.921.com.ar/casco-352-rookie-mono-mate-negro-con-spoiler/p", " LS2903521011",5);
//addProduct("Campera", "Campera LS2 Gallant Hombre Negra", 495981, "https://ls2.921.com.ar/campera-ls2-gallant-hombre-negra/p", "ILS26034012", 15);
//addProduct("Pantalon", "Pantalón Cordura LS2 Chart Evo Hombre", 295614, "https://ls2.921.com.ar/pantalon-cordura-ls2-chart-evo-hombre/p", "LS262011112", 10);
//addProduct("Espaldar", "Espaldar Protección Race", 95856, "https://ls2.921.com.ar/espaldar-proteccion-race/p", "LS2632130302", 2);
//addProduct("Antiparras", "Antiparras Aura Negras Visor Claro", 53838, "https://ls2.921.com.ar/antiparras-aura-negras-visor-claro/p", "LS27201001012", 4);

//getProducts();

//getProductById(3);

//updateProduct(3,{
//  "title": "Producto nuevo pantalon",
//  "description": "Pantalón LS2 nuevo modelo",
//} )

//deleteProduct(2);