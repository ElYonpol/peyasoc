//Llamo al DOM para conectarme con los botones de "Agregar al carrito" y "Ver Carrito"
//y le agrego el EVENT Listener
const activateCartButtons = () => {
	const addButtons = document.querySelectorAll("a.button-cart");
	addButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			//console.log(btn.id);
			addToCart(btn.id);
		});
	});
};

//Función para mostrar los contenidos del carrito de compras
const mostrarCarrito = () => {
	if (cart.length !== 0) {
		console.table(cart);
	} else {
		console.warn("❕ Atención, el carrito está vacío.");
	}
};

//Llamo al DOM para conectarme con el texto de "Ver Carrito", "Ordenar Carrito", "Vaciar Carrito"
//y le agrego el EVENT Listener
const verCarrito = document.querySelector("span#verCarrito");
verCarrito.addEventListener("click", mostrarCarrito);

const ordenaCarrito = document.querySelector("span#ordenaCarrito");
ordenaCarrito.addEventListener("click", ordenarCarrito);

const vaciaCarrito = document.querySelector("span#vaciaCarrito");
vaciaCarrito.addEventListener("click", vaciarCarrito);

//Genero un objeto carrito vacío para usarlo luego en la función correspondiente
const cart = [];

//Genero las variables en las que voy a acumular la cantidad de artículos y el total de la compra
let totalArticulosComprados = 0;
let compraTotalConIVA = 0;

//Consulto al usuario su nombre, verifico que no cargue una cadena vacía.

function login() {
	let nombreUsuario = prompt("Por favor ingrese su nombre:");
	if (nombreUsuario === "" || nombreUsuario === null) {
		do {
			nombreUsuario = prompt(
				"⛔ El nombre ingresado no puede estar vacío. \n Por favor ingrese su nombre:"
			);
		} while (nombreUsuario === "" || nombreUsuario === null);
	}
	alert("Bienvenido " + nombreUsuario.toUpperCase());
	return nombreUsuario;
}

idUsuario = login();

//Llamo a la función para activar los botones de agregar servicios al carrito
activateCartButtons();

//Función para ir agregando servicios al carrito de compras
const addToCart = (servicio) => {
	//debugger;
	let result = products.find((prod) => prod.articulo === servicio);
	if (result !== undefined) {
		result.cantidad = 1;
		let auxPrecioConIVA = result.precio * IVA; //Variable auxiliar para calcular el precio UNITARIO con IVA

		cart.push(result);

		//Con el método REDUCE calculo el total acumulado del precio con IVA del carrito
		compraTotalConIVA = cart.reduce(
			(acc, result) => acc + result.precio * IVA,
			0
		);

		totalArticulosComprados = cart.length;
		precioPromedioCompra = compraTotalConIVA / totalArticulosComprados;

		alert(
			idUsuario +
				", el artículo " +
				result.descripcion +
				" por un valor con IVA de $" +
				auxPrecioConIVA.toLocaleString() +
				" fue agregado con éxito al carrito. ✔\n" +
				"El total de los artículos en el carrito al momento es de " +
				totalArticulosComprados +
				" y el monto total con IVA del carrito es de $" +
				compraTotalConIVA.toLocaleString() +
				", lo que representa un precio promedio con IVA de $" +
				precioPromedioCompra.toLocaleString() +
				"."
		);
		console.clear();
		console.table(cart);
		console.log(
			"El total de artículos comprados hasta ahora es de " +
				totalArticulosComprados +
				" artículos.\n" +
				"El monto total con IVA de la compra asciende a $" +
				compraTotalConIVA.toLocaleString() +
				".\n" +
				"El precio promedio al momento es de $" +
				precioPromedioCompra.toLocaleString() +
				"."
		);
	} else {
		console.error("⛔ El servicio que está intentando agregar no existe.");
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
		console.table(carritoOrdenado);
	} else {
		console.warn("❕ Atención, el carrito está vacío.");
	}
}

function vaciarCarrito() {
	if (cart.length !== 0) {
		cart.splice(0, cart.length);
		console.log("El carrito ha sido vaciado.");
		console.table(cart);
	} else {
		console.warn("❕ Atención, el carrito está vacío.");
	}
}
