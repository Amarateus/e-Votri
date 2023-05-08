// recupero carrito almacenado en localStorage si existe, sino inicializo carrito con un array vacio
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

