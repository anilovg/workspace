const MULTIPLE_CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
    // Link del desafiante, carrito con más de un producto.

let productsCart = []; // Lista con los productos del carrito
let total = 0;
let subtotales = document.getElementsByClassName("subtotal"); // Tomo los subtotales por la clase subtotal
let sendingPercentage = 15; // Porcentaje según envío
let DOLLAR_SYMBOL = "USD";
let PERCENTAGE_SYMBOL = '%';


function updateProductSub(count, unitCost, id, currency){
    // Función para calcular el subtotal de cada artículo en tiempo real

    let subtotalProduct = count*unitCost; // Operación para obtener el subtotal
    document.getElementById("subtotal"+id).innerHTML = currency + " " + subtotalProduct; // Lo coloco en el subtotal de cada artículo

    updateTotal(); // Calculo el total

};


function updateTotal(){ // Función para calcular el costo total 

    let total = 0; 

    for(let sub of subtotales){ // Calculo la suma de los subtotales

        if (sub.innerHTML.split(" ")[0] === "UYU"){
        
            total += parseFloat((sub.innerHTML.split(" ")[1] / 45).toFixed(2));
                // Si el precio está en pesos lo paso a dólares

        } else {

            total += parseFloat(sub.innerHTML.split(" ")[1]);
            
        } 
    };

    document.getElementById("productSub").innerHTML = DOLLAR_SYMBOL + " " +  total;
    // Muestro el subtotal de los productos en dólares

    let sendingCostHTML = document.getElementById("sendingCost");
    let sendingCostToShow = ((sendingPercentage)) + " " + PERCENTAGE_SYMBOL;
    // Muestro el porcentaje según el costo de envío que se escogió

    let totalCostHTML = document.getElementById("totalCost");
    let totalCostToShow = DOLLAR_SYMBOL + " " + ((total * sendingPercentage / 100) + total).toFixed(2); 
    // Calculo el total definitivo sumando el subtotal con el costo de envío

    sendingCostHTML.innerHTML = sendingCostToShow;
    totalCostHTML.innerHTML = totalCostToShow;
    // Muestro ambos en pantalla

};


function showCart(){ // Función para mostrar el carrito de compras

    let htmlToAppend = "";
    let i=0;

    for(let article of productsCart){
        
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle" cantidad><input type="number" style="width: 180px" min ="1" value=${article.count} id="${i}" onchange="updateProductSub(this.value,${article.unitCost},${i},'${article.currency}')"></td></div>
        <td class="align-middle subtotal" id="subtotal${i}">${article.currency} ${article.count*article.unitCost}</td>
        <td><i class="fas fa-trash-alt"></i></td>
        </tr>   
        `
        
        i++;

    }

    document.getElementById("cart").innerHTML = htmlToAppend;
    updateTotal();
    
    // document.getElementById("contArt").innerHTML = article.count;

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

    // Eventos de costo de envío
       document.getElementById("premium").addEventListener("change", function(){
        sendingPercentage = 15;
        updateTotal();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        sendingPercentage = 7;
        updateTotal();
    });

    document.getElementById("standar").addEventListener("change", function(){
        sendingPercentage = 5;
        updateTotal();
    });

    // Obtengo el formulario a validar
    var buyForm = document.getElementById("buy-form");

    buyForm.addEventListener("submit", function(e){

        let addressStreet = document.getElementById("addressStreet");
        let addressNumber = document.getElementById("addressNumber");
        let addressCorner = document.getElementById("addressCorner");

        addressStreet.classList.remove('is-invalid');
        addressNumber.classList.remove('is-invalid');
        addressCorner.classList.remove('is-invalid');

        // Se controla que se haya ingresado la dirección correctamente

        // Consulto por la calle
        if (addressStreet.value === "")
        {
            addressStreet.classList.add('is-invalid');
        }
        
        // Consulto por el número de puerta
        if (addressNumber.value === "")
        {
            addressNumber.classList.add('is-invalid');
        }

        //Consulto por la esquina
        if (addressCorner.value === "")
        {
            addressCorner.classList.add('is-invalid');
        }

        // Para prevenir que el formulario se envíe
        e.preventDefault();
        ;
    });
});