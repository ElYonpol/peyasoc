//Función Constructora para la página de e-commerce

//Comento porque lo saco del asincronismo
/* 
class Product {
	constructor(id, articulo, title, body, precio) {
		this.id = id;
		this.articulo = articulo;
		this.claseCSS = "cartCard--nuevo";
		this.title = title;
		this.body = body;
		this.precio = precio;
		this.cantidad = 0;
	}

	precioUnitarioConIVA() {
		return this.precio * IVA;
	}
}

//Llamo al DOM para conectarme con los botones de "Agregar un nuevo producto
//y le agrego el EVENT Listener
const agregarProducto = () => {
	const agregarNuevoProducto = document.querySelector("#agregarProducto");
	agregarNuevoProducto.addEventListener("click", () => {
		agregoProducto();
	});
};
agregarProducto();

const agregoProducto = async () => {
	const { value: formValues } = await Swal.fire({
		title: "Ingrese los datos del producto",
		html:
			'<label for="swal-articulo">Código artículo:</label>' +
			'<input id="swal-articulo" class="swal2-input">' +
			"</br>" +
			"</br>" +
			'<label for="swal-title">Nombre artículo:</label>' +
			'<input id="swal-title" class="swal2-input">' +
			"</br>" +
			"</br>" +
			'<label for="swal-body">Descripción artículo:</label>' +
			'<input id="swal-body" class="swal2-input">' +
			"</br>" +
			"</br>" +
			'<label for="swal-precio">Precio artículo:</label>' +
			'<input id="swal-precio" class="swal2-input">',
		focusConfirm: false,
		preConfirm: () => {
			return [
				(id = parseInt(Math.random() * 1000)),
				(articulo = document.getElementById("swal-articulo").value.trim()),
				(title = document.getElementById("swal-title").value.trim()),
				(body = document.getElementById("swal-body").value.trim()),
				(precio = parseInt(document.getElementById("swal-precio").value)),
			];
		},
	});

	if (formValues) {
		if (
			articulo.length > 0 &&
			title.length > 0 &&
			body.length > 0 &&
			precio !== NaN
		) {
			const nuevoproducto = new Product(id, articulo, title, body, precio);
			let result = products.find(
				(prod) => prod.articulo === nuevoproducto.articulo
			);
			if (result === undefined) {
				products.push(nuevoproducto);
				containerServicios.innerHTML += returnCard(nuevoproducto);
				activateCartButtons();
				toast(
					`${nuevoproducto.title} se agregó a la base de datos. Ya se puede agregar a la compra`,
					3000,
					"linear-gradient(to right, #00b09b, #96c93d)"
				);
			} else {
				alerta(
					"Error",
					"El artículo ya existe en la base con ese código",
					"error"
				);
			}
		} else {
			alerta("Error", "Atención: debe completar todos los campos.", "error");
			setTimeout(() => {
				agregoProducto();
			}, 1500);
		}
	} else {
		alerta("Error", "Atención: debe completar todos los campos.", "error");
		setTimeout(() => {
			agregoProducto();
		}, 1500);
	}
};
 */