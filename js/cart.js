//Genero un objeto carrito vacío para usarlo luego en la función correspondiente
const cart = [];

//Genero las variables en las que voy a acumular la cantidad de artículos y el total de la compra
let totalArticulosComprados = 0;
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

//Función para mostrar los contenidos del carrito de compras
const loadCart = () => {
	if (localStorage.getItem("cart")) {
		let loadedCart = JSON.parse(localStorage.getItem("cart"));
		loadedCart.forEach((product) => cart.push(product));
	} else {
		alerta(
			"Error",
			"Atención, no se encontró un carrito previamente guardado.",
			"error"
		);
	}
};
loadCart();

const showUserCart = document.querySelector(".userCart");

const mostrarCarrito = () => {
	showUserCart.innerHTML = "";
	if (cart.length !== 0) {
		//debugger;
		console.table(cart);
		cart.forEach((product) => {
			showUserCart.innerHTML += tableCart(product);
		});

		compraTotalConIVA = cart.reduce(
			(acc, result) => acc + result.precio * IVA,
			0
		);

		showUserCart.innerHTML += `<tr class="fw-bold">
				<th scope="row">Total</th>
				<td>${compraTotalConIVA.toLocaleString()}</td>
				<td></td>
				<td></td>
			</tr>`;
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
	//debugger
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
	if (result !== undefined) {
		result.cantidad = 1;
		let auxPrecioConIVA = result.precio * IVA; //Variable auxiliar para calcular el precio UNITARIO con IVA

		cart.push(result);
		saveCart(); //Guardo el contenido del carrito en localStorage
		toast(
			`${result.title} se agregó al carrito.`,
			3000,
			"linear-gradient(to right, #00b09b, #96c93d)"
		);
	} else {
		alerta(
			"Error",
			"El servicio que está intentando agregar no existe.",
			"error"
		);
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
		cart.splice(0, cart.length);

		toast(
			"El carrito ha sido vaciado.",
			3000,
			"linear-gradient(to right, #D40F22, #E74C3C)"
		);
		console.log("");
		console.table(cart);
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
