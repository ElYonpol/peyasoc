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

//Llamo al DOM para conectarme con los botones de "Agregar/Quitar unidad" y "Eliminar del carrito"
//y le agrego el EVENT Listener
const activateCartItemButtons = () => {
	const deleteCartItemBtns = document.querySelectorAll(".eliminarProducto");
	const addUnitCartItemBtns = document.querySelectorAll(".agregarUnidad");
	const removeUnitCartItemBtns = document.querySelectorAll(".quitarUnidad");
	deleteCartItemBtns.forEach((deleteBtn) => {
		deleteBtn.addEventListener("click", () => {
			deleteCartItem(deleteBtn.id);
		});
	});
	addUnitCartItemBtns.forEach((addUnitbtn) => {
		addUnitbtn.addEventListener("click", () => {
			addUnitCartItem(addUnitbtn.id);
		});
	});
	removeUnitCartItemBtns.forEach((removeUnitbtn) => {
		removeUnitbtn.addEventListener("click", () => {
			removeUnitCartItem(removeUnitbtn.id);
		});
	});
};

//Función para mostrar los contenidos del carrito de compras
const loadCart = () => {
	if (localStorage.getItem("cart")) {
		let loadedCart = JSON.parse(localStorage.getItem("cart")) || [];
		loadedCart.forEach((product) => cart.push(product));
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
				<td>${compraTotalConIVA.toLocaleString("locale", {
					style: "currency",
					currency: "ARS",
					maximumFractionDigits: 0,
				})}</td>
				<td></td>
				<td></td>
			</tr>`;
		activateCartItemButtons();
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
	let result = products.find((prod) => prod.articulo === servicio);
	let cartItemExists = cart.find((cartItem) => cartItem.articulo === servicio);

	if (result !== undefined) {
		if (cartItemExists !== undefined) {
			//cartItemExists.cantidad++;
			addUnitCartItem(servicio)
		} else {
			result.cantidad = 1;
			cart.push(result);
			toast(
				`${result.title} se agregó al carrito.`,
				3000,
				"linear-gradient(to right, #00b09b, #96c93d)"
			);
		}
		saveCart(); //Guardo el contenido del carrito en localStorage
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

//Función para agregar 1 unidad a un item del carrito
const addUnitCartItem = (itemAgregar) => {
	let resultAgregar = cart.find((prod) => prod.articulo === itemAgregar);
	resultAgregar.cantidad++;
	saveCart(); //Guardo el contenido del carrito en localStorage
	mostrarCarrito();
	toast(
		`Se agregó 1 unidad de ${resultAgregar.title}.`,
		3000,
		"linear-gradient(to right, #00b09b, #96c93d)"
	);
	if (showTable.style.display === "") {
		mostrarCarrito();
	}
};

//Función para quitar 1 unidad a un item del carrito
const removeUnitCartItem = (itemQuitar) => {
	let resultQuitar = cart.find((prod) => prod.articulo === itemQuitar);
	if (resultQuitar.cantidad === 1) {
		deleteCartItem(itemQuitar);
	} else {
		resultQuitar.cantidad--;
		saveCart(); //Guardo el contenido del carrito en localStorage
		mostrarCarrito();
		toast(
			`Se eliminó 1 unidad de ${resultQuitar.title}.`,
			3000,
			"linear-gradient(to right, #D40F22, #E74C3C)"
		);
		if (showTable.style.display === "") {
			mostrarCarrito();
		}
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
				const itemEliminar = cart.findIndex((cartItem) => {
					return cartItem.articulo === servicioEliminar;
				});
				cart.splice(itemEliminar, 1);
			} else {
				alerta(
					"Error",
					"El servicio que está intentando eliminar no existe en el carrito.",
					"error"
				);
			}
			saveCart(); //Guardo el contenido del carrito en localStorage
			mostrarCarrito();
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
		let carritoOrdenado = cart.sort((firstItem, secondItem) => {
			if (firstItem.articulo > secondItem.articulo) {
				return 1;
			}
			if (firstItem.articulo < secondItem.articulo) {
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
