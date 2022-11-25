//Genero un objeto productos vacío y la URL de MOCKAPI para usarlo luego en la
//función correspondiente
/* let products = [];
const URL = "https://635d78e707076ac24f3dbf4a.mockapi.io/productos";
localStorage.removeItem("products"); */

//Me conecto con MOCKAPI para traer el listado de productos remoto
/* const traerProductos = async () => {
	try {
		const respuesta = await fetch(URL);
		datos = await respuesta.json();
		localStorage.setItem("products", JSON.stringify(datos));
		return datos;
	} catch (error) {
		return "Error";
	}
}; */

//Templates generales para armar la estructura HTML con JavaScript
const returnCard = (product) => {
	return `<div class="cartCard ${product.claseCSS}">
                <div class="cartCard-content">
                    <p class="cartCard-content__title">${product.title}</p>
                    <p class="cartCard-content__body">${product.body}</p>
                    <button class="button-cart" id="${product.articulo}" title="Haga click para agregar '${product.title}' al carrito">Agregar 🛒</button>
                </div>
            </div>`;
};

const returnError = () => {
	return `<div class="cartCard">
                <div class="cartCard-content">
                    <p class="cartCard-content__title">⛔Surgió un inconveniente</p>
                    <p class="cartCard-content__body">Lo sentimos, no pudimos cargar el artículo.</p>
                    <p class="cartCard-content__body">Por favor, intenta nuevamente.</p>
                </div>
            </div>`;
};

const tableCart = (cartItem) => {
	return `<tr>
                <th scope="row">${cartItem.title}</th>
                <td>${(
									cartItem.precio *
									cartItem.cantidad *
									IVA
								).toLocaleString("locale", {
									style: "currency",
									currency: "ARS",
									maximumFractionDigits: 0,
								})}</td>
                <td><span class="agregarUnidad" id="${
									cartItem.articulo
								}" title="Agregar 1">➕</span>   ${
		cartItem.cantidad
	}   <span class="quitarUnidad" id="${
		cartItem.articulo
	}" title="Quitar 1">➖</span></td>
                <td><span class="eliminarProducto" id="${
									cartItem.articulo
								}" title="Haga click para eliminar '${
		cartItem.title
	}' del carrito">X</span></td>
            </tr>`;
};

//Creo el alert con la Librería SweetAlert
const alerta = (titulo, mensaje, icono) => {
	Swal.fire({
		icon: icono || "",
		title: titulo || "",
		text: mensaje,
		showConfirmButton: true,
		//showCloseButton: true,
		//showCancelButton: true,
		//timer: 1500,
		width: "250px",
	});
};

const alertaCompra = (mensaje) => {
	Swal.fire({
		title: mensaje || "",
		showDenyButton: true,
		//showCancelButton: true,
		confirmButtonColor: "#96c93d",
		denyButtonColor: "#f88a02",
		confirmButtonText: "Continuar comprando",
		denyButtonText: "Ir a Inicio",
	}).then((result) => {
		if (result.isConfirmed) {
			location.href = "../pages/compras.html";
		} else if (result.isDenied) {
			location.href = "../index.html";
		}
	});
};

//Creo el aviso de Toastify
const toast = (mensaje, tiempo, estiloCSS) => {
	Toastify({
		text: mensaje,
		duration: tiempo,
		//destination: "https://github.com/apvarun/toastify-js",
		//newWindow: true,
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		//stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: estiloCSS,
		},
		//onClick: function () {}, // Callback after click
	}).showToast();
};
