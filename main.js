// Constantes Globales
const btnSubmit = document.getElementById("btnSubmit"),
  $title = document.querySelector(".title"),
  $form = document.getElementById("form"),
  $table = document.querySelector(".table-cars"),
  $template = document.getElementById("template-car").content,
  $fragment = document.createDocumentFragment();

let editCar = false;
let indexCarEdit = null;

if (typeof localStorage === null) {
  alert("Su Navegador no acepta localStorage");
} else {
  if (localStorage.getItem("cars") === null) {
    localStorage.setItem("cars", JSON.stringify([]));
  }
}

let arrayCars = JSON.parse(localStorage.getItem("cars"));

// Editar o Eliminar un Carro de la Tabla
document.addEventListener("click", (e) => {
  if (e.target.matches("#editar") || e.target.matches("#editar *")) {
    let btnEdit = e.target.closest("#editar");
    $form.marca.value = btnEdit.dataset.marca;
    $form.nombre.value = btnEdit.dataset.nombre;
    $form.modelo.value = btnEdit.dataset.modelo;
    $form.color.value = btnEdit.dataset.color;
    $form.puertas.value = btnEdit.dataset.puertas;

    $title.textContent = "Editar Carro";
    btnSubmit.textContent = "Editar Carro";

    indexCarEdit = btnEdit.dataset.id;
    editCar = true;
  }

  if (e.target.matches("#eliminar") || e.target.matches("#eliminar *")) {
    let userIndex = e.target.closest("#eliminar"),
      userIndexDelete = userIndex.dataset.id;

    arrayCars.splice(userIndexDelete, 1);
    renderCars();
  }
});

// Agregar un Carro o Editar uno Existente
const formSubmit = (e) => {
  e.preventDefault();

  let car = {
    name: $form.nombre.value,
    model: $form.modelo.value,
    doors: $form.puertas.value,
    color: $form.color.value,
    brand: $form.marca.value,
  };
  // Comprobamos si queremos editar un Carro o Agregar uno nuevo
  if (editCar) {
    let editedCar = car;
    arrayCars[indexCarEdit] = editedCar;

    $title.textContent = "Agregar Carro";
    btnSubmit.textContent = "Agregar Carro";
    indexCarEdit = null;

    renderCars();
  } else {
    let newCar = car;
    arrayCars = [...arrayCars, newCar];
    renderCars();
  }
};

const renderCars = () => {
  localStorage.setItem("cars", JSON.stringify(arrayCars));

  arrayCars.forEach((car, index) => {
    $template.getElementById("marca").textContent = car.brand;
    $template.getElementById("nombre").textContent = car.name;
    $template.getElementById("modelo").textContent = car.model;
    $template.getElementById("color").textContent = car.color;
    $template.getElementById("puertas").textContent = car.doors;

    // Agregamos los Datos al Boton de Editar
    $template.getElementById("editar").dataset.id = index;
    $template.getElementById("editar").dataset.marca = car.brand;
    $template.getElementById("editar").dataset.nombre = car.name;
    $template.getElementById("editar").dataset.modelo = car.model;
    $template.getElementById("editar").dataset.color = car.color;
    $template.getElementById("editar").dataset.puertas = car.doors;

    // Agregamos un ID al boton de Eliminar
    $template.getElementById("eliminar").dataset.id = index;

    const $clone = document.importNode($template, true);

    $fragment.appendChild($clone);
  });

  $form.reset();
  $table.innerHTML = "";
  $table.appendChild($fragment);
};

$form.addEventListener("submit", formSubmit);
document.addEventListener("DOMContentLoaded", renderCars);
