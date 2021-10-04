const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

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

window.onload = function() { // Función para mostrar el usuario guardado en localStorage

    if(localStorage.getItem('username') !== null){ // Si en el LS hay un usuario lo muestra junto con el dropdown

      document.getElementById('user-name').innerText = window.localStorage.getItem('username')

    }

    else { // Si no hay usuario registrado muestra un link para iniciar sesión que va al login

      document.getElementById('iniciarSesion').innerHTML = "<a class='py-2 d-none d-md-inline-block' href='index.html'>Iniciar sesión</a>";

    } 
};

function cerrarSesion(){ // Función para que me borre el username del LS una vez que cierre sesión
  window.localStorage.removeItem('username')
};


document.getElementById("menu").innerHTML += `<div class="container d-flex flex-column flex-md-row justify-content-between">
<a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
<a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
<a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
<a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>

<div id="iniciarSesion">
<div class="dropdown">
  <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownUserButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <div class="py-0 d-none d-md-inline-block" id="user-name"></div>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownUserButton">
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
     <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="index.html" onclick="cerrarSesion()">Cerrar sesión</a>
  </div>
</div>
</div>
</div>
`

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});