// contenedores. DOM
const contenedorProductos = document.querySelector("#contenedorProductos")
const cantProd = document.querySelector("#cantProd")

// Busca productos de mi BBDD .json
// lo almacena en elementosGimnasio
// carga los productos en pantalla (si los hay)
// sino devuelve la fn sinProductos() avisando al usuario que no hay stock
const elementosGimnasio = []

fetch("js/elementosGimnasio.json")
    .then((resp) => resp.json())
    .then((data) => elementosGimnasio.push(...data))
    .then(() => mostrarProductos(elementosGimnasio))
    .catch(() => sinProductos())

    // Almacenar contenido actual del carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// botones de agregado de productos al carrito, actualizacion del total, localStorage...
function agregarProductoCarrito() {
    let botones = document.querySelectorAll(".btnAgregarProd")
    if (botones !== null) {
        for (const boton of botones) {
            boton.addEventListener("click", (e) => {
                let producto = elementosGimnasio.find((elemento) => elemento.codigo === parseInt(e.target.id))
                carrito.push(producto)
                cantProd.innerHTML = totalProd()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Has agregado al carrito:\n${producto.nombre}`,
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })

                guardarCarrito()
                
                botonCompra()
                botonVaciar()
            })
        }
    }
}

// calcular precio total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((acc, producto) => acc + producto.precio, 0)
}

// boton comprar. Instancio clase Compra
function botonCompra() {
    let boton = document.querySelector("#comprar")
    boton.addEventListener("click", (e) => {
        let compra = new Compra(carrito)
        compra.contenido()
    })
}

// boton vaciar carrito
function botonVaciar() {
    let boton = document.querySelector("#vaciar")
    boton.addEventListener("click", (e) => {
        Swal.fire({
            title: '¿Deseas vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    timer: 1500,
                    title: '¡Carrito vaciado!',
                    text: 'Vuelva a comenzar su compra',
                    icon: 'success'
                })

                carrito.length = 0
                guardarCarrito()
                cantProd.innerHTML = totalProd()
                botonCompra()
            }
        })
        
    })
}

// formato card de producto
function crearCard(producto) {
    return `<div class="card">
                <div>${producto.imagen}</div>
                <div>${producto.nombre}</div>
                <div>$${producto.precio}</div>
                <div><button class="btnAgregarProd" id="${producto.codigo}">Agregar</button></div>
            </div>`
}

// Mostrar en HTML conteo de productos y total compra. Boton "comprar" y "vaciar" carrito
function totalProd() {
    return `<h2>Productos agragados: ${carrito.length}</h2>
            <h3>Valor total de la compra: $${calcularTotalCarrito()}</h3>
            <div><button id="comprar">Comprar</button>
            <div><button id="vaciar">Vaciar carrito</button>`
}

// card en caso de no encontrar productos en la BBDD
function sinProductos() {
    contenedorProductos.innerHTML = `<h2>Por el momento no contamos con stock de ningun producto</h2>
                                    <h3>Vuelva la proxima semana y enterese de las novedades</h3>`
}

// mostrar los productos de la BBDD en el HTML
// Habilitar botones de agregar productos al carrito y de finalizar compra
function mostrarProductos(arrayProductos) {
        arrayProductos.forEach((producto) => contenedorProductos.innerHTML += crearCard(producto))

        cantProd.innerHTML = totalProd()

        agregarProductoCarrito()

        botonCompra()
        botonVaciar()
}





