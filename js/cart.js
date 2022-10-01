//Función Constructora para la página de e-commerce

const IVA = 1.21;

class Producto {
	constructor(articulo, precio, cantidad) {
		this.articulo = articulo;
		this.precio = precio;
		this.cantidad = cantidad;
	}

	precioUnitarioConIVA() {
		return this.precio * IVA;
	}

	precioTotalConIVA() {
		return this.precio * IVA * this.cantidad;
	}
}

//Genero 7 artículos de prueba para la página de e-commerce

const producto0 = new Producto("Blanqueamiento", 5000, 0);
const producto1 = new Producto("Prótesis Completa", 25000, 0);
const producto2 = new Producto("Prótesis Flexible", 15000, 0);
const producto3 = new Producto("Prótesis Cromo-Cobalto", 35000, 0);
const producto4 = new Producto("Ortodoncia convencional (braquets)", 75000, 0);
const producto5 = new Producto("Implante y Corona", 95000, 0);
const producto6 = new Producto("Placa Miorelajante", 45000, 0);

//Consulto al usuario su nombre, verifico que no cargue una cadena vacía.
//Luego qué artículos quiere comprar y
//qué cantidad de cada uno, hasta que presione la tecla para salir.
//Verifico que el dato cargado sea un número.

function login() {
	let nombreUsuario = prompt("Por favor ingrese su nombre:");
	if (nombreUsuario === "") {
		do {
			nombreUsuario = prompt(
				"El nombre ingresado no puede estar vacío. Por favor ingrese su nombre:"
			);
		} while (nombreUsuario === "");
	}
	alert("Bienvenido " + nombreUsuario.toUpperCase());
}

//Función para cargar las cantidades de los 3 primeros artículos ofrecidos
function carritoCompras() {
	//debugger;

	if (isNaN(producto0.cantidad) || producto0.cantidad <= 0) {
		do {
			producto0.cantidad = parseInt(
				prompt(
					"Ingrese la cantidad del servicio de \n" +
						producto0.articulo.toUpperCase() +
						" que desea adquirir:"
				)
			);
		} while (isNaN(producto0.cantidad) || producto0.cantidad <= 0);
	}
	let totalArticulosComprados = 1;
	let compraTotalConIVA = producto0.precioTotalConIVA();
	let continuarCompra = confirm(
		"¿Desea continuar su compra con el siguiente servicio?"
	);
	if (continuarCompra) {
		if (isNaN(producto1.cantidad) || producto1.cantidad <= 0) {
			do {
				producto1.cantidad = parseInt(
					prompt(
						"Ingrese la cantidad del servicio de \n" +
							producto1.articulo.toUpperCase() +
							" que desea adquirir:"
					)
				);
			} while (isNaN(producto1.cantidad) || producto1.cantidad <= 0);
		}
		totalArticulosComprados++;
		compraTotalConIVA = compraTotalConIVA + producto1.precioTotalConIVA();
		continuarCompra = confirm(
			"¿Desea continuar su compra con el siguiente servicio?"
		);
		if (continuarCompra) {
			if (isNaN(producto2.cantidad) || producto2.cantidad <= 0) {
				do {
					producto2.cantidad = parseInt(
						prompt(
							"Ingrese la cantidad del servicio de \n" +
								producto2.articulo.toUpperCase() +
								" que desea adquirir:"
						)
					);
				} while (isNaN(producto2.cantidad) || producto2.cantidad <= 0);
			}
			totalArticulosComprados++;
			compraTotalConIVA = compraTotalConIVA + producto2.precioTotalConIVA();
			precioPromedioCompra = compraTotalConIVA / totalArticulosComprados;
		}
	}

	compraTotalConIVAFormat = compraTotalConIVA.toLocaleString();
	precioPromedioCompraFormat = precioPromedioCompra.toLocaleString();

	let resumenCompraTotal =
		"El precio total de su compra es de $" +
		compraTotalConIVAFormat +
		" en un total de " +
		totalArticulosComprados +
		" artículo(s).";

	let promedioCompraTotal =
		"El precio promedio por artículo de su compra es de $" +
		precioPromedioCompraFormat +
		". \nGracias por su compra.";

	alert(resumenCompraTotal + "\n" + promedioCompraTotal);

	console.log(resumenCompraTotal);
	console.log(promedioCompraTotal);

	//Borro las cantidades para una nueva carga del carrito de compras
	producto0.cantidad = 0;
	producto1.cantidad = 0;
	producto2.cantidad = 0;
}

login();

//carritoCompras();
