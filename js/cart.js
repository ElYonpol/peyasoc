//Genero un objeto carrito vacío para usarlo luego en la función correspondiente
const cart = [];

//Genero las variables en las que voy a acumular el total de la compra
let compraTotalConIVA = 0;

//Llamo al DOM para conectarme con los botones de "Agregar al carrito"
//y le agrego el EVENT Listener
const activateCartButtons = () => {
	const addButtons = document.querySelectorAll(".button-cart");
	addButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			addToCart(btn.id);
		});
	});
};

//Llamo al DOM para conectarme con los botones de "Eliminar del carrito"
//y le agrego el EVENT Listener
const activateCartItemDeleteButtons = () => {
	const deleteCartItemBtns = document.querySelectorAll(".eliminarProducto");
	deleteCartItemBtns.forEach((deleteBtn) => {
		deleteBtn.addEventListener("click", () => {
			deleteCartItem(deleteBtn.id);
		});
	});
};

//Función para mostrar los contenidos del carrito de compras
const loadCart = () => {
	if (localStorage.getItem("cart")) {
		let loadedCart = JSON.parse(localStorage.getItem("cart"));
		loadedCart.forEach((product) => cart.push(product));
	} else {
		toast(
			"Actualmente no hay productos en el carrito.",
			3000,
			"linear-gradient(to right, #6f756b, #96c93d)"
		);
	}
};
loadCart();

//Llamo al DOM para contectarme con la tabla y las filas del carrito
const showTable = document.querySelector("#cartTable");
const showUserCart = document.querySelector(".userCart");

const mostrarCarrito = () => {
	showUserCart.innerHTML = "";
	if (cart.length !== 0) {
		showTable.style.display = "";
		cart.forEach((product) => {
			showUserCart.innerHTML += tableCart(product);
		});

		compraTotalConIVA = cart.reduce(
			(acc, cartItem) => acc + cartItem.precio * cartItem.cantidad * IVA,
			0
		);

		showUserCart.innerHTML += `<tr class="fw-bold">
				<th scope="row">Total</th>
				<td>${compraTotalConIVA.toLocaleString()}</td>
				<td></td>
				<td></td>
			</tr>`;
		activateCartItemDeleteButtons();
	} else {
		alerta("Error", "Atención: el carrito está vacío.", "error");
	}
};

//Llamo al DOM para contectarme con el div contenedor y generar las cards con los servicios
const containerServicios = document.querySelector("div.cartCards--container");

//Llamo al DOM para conectarme con el texto de "Ver Carrito", "Ordenar Carrito", "Vaciar Carrito"
//y le agrego el EVENT Listener
const verCarrito = document.querySelector("span#verCarrito");
verCarrito.addEventListener("click", mostrarCarrito);

const ordenaCarrito = document.querySelector("span#ordenaCarrito");
ordenaCarrito.addEventListener("click", ordenarCarrito);

const vaciaCarrito = document.querySelector("span#vaciaCarrito");
vaciaCarrito.addEventListener("click", vaciarCarrito);

//Recorro el array de productos y armo las cards para cargarlas en pantalla
const loadCards = () => {
	containerServicios.innerHTML = "";
	products.forEach(
		(producto) => (containerServicios.innerHTML += returnCard(producto))
	);
	activateCartButtons(); //Llamo a la función para activar los botones de agregar servicios al carrito
};
loadCards();

//Función para ir agregando servicios al carrito de compras
const addToCart = (servicio) => {
	//debugger;
	let result = products.find((prod) => prod.articulo === servicio);
	let cartItemExists = cart.find((cartItem) => cartItem.articulo === servicio);

	if (result !== undefined) {
		if (cartItemExists !== undefined) {
			cartItemExists.cantidad++;
		} else {
			result.cantidad = 1;
			cart.push(result);
		}
		saveCart(); //Guardo el contenido del carrito en localStorage
		toast(
			`${result.title} se agregó al carrito.`,
			3000,
			"linear-gradient(to right, #00b09b, #96c93d)"
		);
		if (showTable.style.display === "") {
			mostrarCarrito();
		}
	} else {
		alerta(
			"Error",
			"El servicio que está intentando agregar no existe.",
			"error"
		);
	}
};

//Función para eliminar un item del carrito
const deleteCartItem = (servicioEliminar) => {
	//debugger;
	if (cart.length === 1) {
		vaciarCarrito();
	} else {
		let resultEliminar = products.find(
			(prod) => prod.articulo === servicioEliminar
		);
		let cartItemExists = cart.find(
			(cartItem) => cartItem.articulo === servicioEliminar
		);

		if (resultEliminar !== undefined) {
			if (cartItemExists !== undefined) {
				cart.splice(resultEliminar.articulo, 1);
			} else {
				alerta(
					"Error",
					"El servicio que está intentando eliminar no existe en el carrito.",
					"error"
				);
			}
			mostrarCarrito();
			saveCart(); //Guardo el contenido del carrito en localStorage
			toast(
				`${resultEliminar.title} se eliminó del carrito.`,
				3000,
				"linear-gradient(to right, #D40F22, #E74C3C)"
			);
			if (showTable.style.display === "") {
				mostrarCarrito();
			}
		} else {
			alerta(
				"Error",
				"El servicio que está intentando eliminar no existe.",
				"error"
			);
		}
	}
};

//Función para ordenar los productos del carrito por el nombre del servicio
function ordenarCarrito() {
	if (cart.length !== 0) {
		let carritoOrdenado = cart.sort((a, b) => {
			if (a.articulo > b.articulo) {
				return 1;
			}
			if (a.articulo < b.articulo) {
				return -1;
			}
			return 0;
		});
		mostrarCarrito();
		saveCart();
		toast(
			"Carrito ordenado",
			3000,
			"linear-gradient(to right, #00b09b, #96c93d)"
		);
	} else {
		alerta("Error", "Atención: el carrito está vacío.", "error");
	}
}

//Función para vaciar los productos del carrito
function vaciarCarrito() {
	showUserCart.innerHTML = "";
	localStorage.removeItem("cart");
	if (cart.length !== 0) {
		cart.forEach((cartItem) => (cartItem.precio = 0));
		cart.forEach((cartItem) => (cartItem.cantidad = 0));
		cart.splice(0, cart.length);
		toast(
			"El carrito ha sido vaciado.",
			3000,
			"linear-gradient(to right, #D40F22, #E74C3C)"
		);
		showTable.style.display = "none";
	} else {
		alerta("Error", "Atención: el carrito está vacío.", "error");
	}
}

//Funciones para guardar y recuperar el contenido del carrito usando localStorage
const saveCart = () => {
	if (cart.length > 0) {
		localStorage.setItem("cart", JSON.stringify(cart));
	}
};
