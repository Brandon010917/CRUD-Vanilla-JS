// Constantes Globales
const btnSubmit = document.getElementById("btnSubmit"),
  $title = document.querySelector(".title"),
  $form = document.getElementById("form"),
  $table = document.querySelector(".table-users"),
  $template = document.getElementById("template-user").content,
  $fragment = document.createDocumentFragment();

let editUser = false;
let indexEditUser = 0;

if (localStorage.getItem("users") === null) {
  localStorage.setItem("users", JSON.stringify([]));
}

const usersArray = JSON.parse(localStorage.getItem("users"));

const renderList = () => {
  $table.innerHTML = "";

  usersArray.forEach((user, index) => {
    $template.querySelector(".table-user").dataset.id = index;
    $template.querySelector("#firstName").textContent = user.name;
    $template.querySelector("#lastName").textContent = user.lastName;
    $template.querySelector("#email").textContent = user.email;

    const $clone = document.importNode($template, true);

    $fragment.appendChild($clone);
  });
  $table.appendChild($fragment);

  localStorage.setItem("users", JSON.stringify(usersArray));
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Agregar un Nuevo Usuario
  if (!editUser) {
    let newUser = {
      name: $form.firstName.value,
      lastName: $form.lastName.value,
      email: $form.email.value,
    };

    usersArray.push(newUser);
  } else {
    //   Editar un Usuario
    let editedUser = {
      name: $form.firstName.value,
      lastName: $form.lastName.value,
      email: $form.email.value,
    };

    // usersArray.splice(indexEditUser, 1, editedUser);
    usersArray[indexEditUser] = editedUser;

    $title.textContent = "Agregar Usuario";
    editUser = false;
  }

  renderList();
  $form.reset();
});

document.addEventListener("click", (e) => {
  // Editar Usuario
  if (e.target.matches("#edit") || e.target.matches("#edit *")) {
    editUser = true;
    $title.textContent = "Editar Usuario";
    let parent = e.target.closest(".table-user");

    indexEditUser = parent.dataset.id;
    $form.firstName.value = parent.querySelector("#firstName").textContent;
    $form.lastName.value = parent.querySelector("#lastName").textContent;
    $form.email.value = parent.querySelector("#email").textContent;
  }

  //   Eliminamos el Usuario
  if (e.target.matches("#delete") || e.target.matches("#delete *")) {
    let indexArray = e.target.closest(".table-user").dataset.id;
    usersArray.splice(indexArray, 1);

    renderList();
  }
});

document.addEventListener("DOMContentLoaded", renderList);
