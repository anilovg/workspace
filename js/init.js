// const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const CATEGORIES_URL = "http://localhost:3000/categories"; // Link servidor local
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
// const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_URL = "http://localhost:3000/products"; // Link servidor local
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
// const MULTIPLE_CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
    // Link del desafiante, carrito con más de un producto.
const MULTIPLE_CART_URL = "http://localhost:3000/cart"; // Link de servidor local

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

window.onload = function() { // Función para mostrar los datos guardados en el LS

    if(localStorage.getItem('username') !== null){ // Si en el LS hay un usuario lo muestra junto con el dropdown

      document.getElementById('user-name').innerHTML = window.localStorage.getItem('username') + " " + "<i class='fas fa-caret-down'></i>";

    }

    else { // Si no hay usuario registrado muestra un link para iniciar sesión que va al login

      document.getElementById('iniciarSesion').innerHTML = "<a href='index.html'>Iniciar sesión</a>";

    }
    
    let user = JSON.parse(window.localStorage.getItem('userprofile_info')); // Para mostrar los datos del usuario en "Mi perfil"

    document.getElementById('name-profile').value = user.firstName;
    document.getElementById('lastname-profile').value = user.lastName;
    document.getElementById('age-profile').value = user.age;
    document.getElementById('address-profile').value = user.address;
    document.getElementById('email-profile').value = user.email;
    document.getElementById('number-profile').value =  user.number;
    document.getElementById('img-profile').src = window.localStorage.getItem('img')

};

function cerrarSesion(){ // Función para que me borre el username del LS una vez que cierre sesión
  window.localStorage.removeItem('username')
};

document.getElementById("menu").innerHTML += `
<div class="topnav" id="myTopnav">
<div class="container">

  <a href="inicio.html" class="active"><i class="fa fa-fw fa-home"></i></a>
  <a href="categories.html">Catergorías</a>
  <a href="products.html">Productos</a>
  <a href="sell.html">Vender</a>
  <div id="iniciarSesion">
  <div class="dropdown">
    <button class="dropbtn">
      <div value="" id="user-name"></div>
    </button>
    <div class="dropdown-content">
      <a href="my-profile.html">Mi perfil</a>
      <a href="cart.html">Mi carrito</a>
        <div class="dropdown-divider"></div>
      <a href="index.html" onclick="cerrarSesion()">Cerrar sesión</a>
    </div>
  </div> 
  </div>
    <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a>
</div>
</div>
`
document.getElementById("footer").innerHTML += `
    <div class="container">
      <p class="float-right">
        <a href="#"><b>Subir</b> <i class="fas fa-rocket"></i></a>
      </p>
      <p>Este sitio forma parte de Desarrollo Web - JAP - 2021</p>
      <p>Clickea <a target="_blank" href="Letra.pdf">aquí</a> para descargar la letra del obligatorio.</p>
    </div>
    </footer>
`

// Script para el topnav mobile responsive
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});