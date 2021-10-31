const MULTIPLE_CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
    // Link del desafiante, carrito con más de un producto.

let productsCart = [];    // Lista con los productos del carrito

function updateProductSub(count, unitCost, id, currency){
    // Función para calcular el subtotal de cada artículo en tiempo real

    let subtotalProduct = count*unitCost; // Operación para obtener el subtotal
    document.getElementById("subtotal"+id).innerHTML = currency + " " + subtotalProduct; // Lo coloco en el subtotal de cada artículo

    // updateTotal(); // Calculo el total

};

// function updateTotal(){ // Función para calcular el costo total


function showCart(){ // Función para mostrar el carrito de compras

    let htmlToAppend = "";
    let i=0;

    for(let article of productsCart){
        
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number" min ="1" value=${article.count} id="${i}" onchange="updateProductSub(this.value,${article.unitCost},${i},'${article.currency}')"></td>
        <td class="align-middle subtotal" id="subtotal${i}">${article.currency} ${article.count*article.unitCost}</td>
        </tr>        
        `
        
        i++;

        // updateTotal();
    }

    document.getElementById("cart").innerHTML = htmlToAppend;

};


function getCarrito(url){ // Función para obtener el carrito a partir de la petición
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    });
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getCarrito(MULTIPLE_CART_URL) // Paso el URL al cual hacer la petición a la función getCarrito
    .then(resultObj=>{
        productsCart = resultObj.articles;
        showCart(); // Ejecuto la función para mostrar el carrito
    });
});