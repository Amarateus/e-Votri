/*
Clase que simula cada compra
Propiedad
    carrito
Metodos
    mostrar contenido y total
    aplicar descuento
*/

class Compra {
    constructor(carrito) {
        this.carrito = carrito
    }
    
    contenido() {
        if (this.carrito.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡El carrito esta vacio!',
                timer: 1500
            })
            
        } else {
            Swal.fire({
                title: '¿Confirmar compra?',
                text: `El total de su compra es de $${calcularTotalCarrito()}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Proceder a pagina de pago',
                cancelButtonText: 'Continuar comprando'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Muchas gracias por tu visita 😁',
                        text: 'Serás redireccionad@ a la pagina de pago!',
                        icon: 'success',
                        timer: 3000
                    })

                    carrito.length = 0
                    guardarCarrito()
                    cantProd.innerHTML = totalProd()
                }
            })               
        }
    }
}
