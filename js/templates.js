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
                <td>${(cartItem.precio * cartItem.cantidad * IVA).toLocaleString()}</td>
                <td>${cartItem.cantidad}</td>
                <td><span class="eliminarProducto" id="${cartItem.articulo}" title="Haga click para eliminar '${cartItem.title}' del carrito">X</span></td>
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
