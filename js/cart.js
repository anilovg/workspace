let productsCart = []; // Lista con los productos del carrito
let total = 0;
let subtotales = document.getElementsByClassName("subtotal"); // Tomo los subtotales por la clase subtotal
let sendingPercentage = 15; // Porcentaje según envío
let DOLLAR_SYMBOL = "USD";
let PERCENTAGE_SYMBOL = '%';
// PARA VALIDACIONES
let SUCCESS_MSG = "¡Se ha realizado la publicación con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


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

    document.getElementById("productSub").innerHTML = DOLLAR_SYMBOL + " " +  (total).toFixed(2);
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
        <td><button class="btn"><i class="fas fa-trash-alt"></i></button></td>
        </tr>   
        `

        i++;
    }

    if(localStorage.getItem('username') !== null){ // Si en el LS vemos que se inició sesión se muestra la página con el carrito

        document.getElementById("cart").innerHTML = htmlToAppend;
        updateTotal();
        // document.getElementById("contArt").innerHTML = article.count;
    }
    
    else { // Si no, se muestra un link para ir a iniciar sesión 

        document.getElementById("hiddenCart").innerHTML = "<div class='text-center'><a href='index.html'>Debes de iniciar sesión para acceder a tu carrito</a></div>";
    }
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

    // VALIDACIONES
        //Se obtiene el formulario de compra
        var buyForm = document.getElementById("buy-info");

        //Se agrega una escucha en el evento 'submit' que será
        //lanzado por el formulario cuando se seleccione 'Publicar producto'.
        buyForm.addEventListener("submit", function(e){
    
            let addressName = document.getElementById("addressName");
            let addressNumber = document.getElementById("addressNumber");
            let addressCorner = document.getElementById("addressCorner");
            let infoMissing = false;
    
            //Quito las clases que marcan como inválidos
            addressName.classList.remove('is-invalid');
            addressNumber.classList.remove('is-invalid');
            addressCorner.classList.remove('is-invalid');

    
            //Se realizan los controles necesarios,
            //En este caso se controla que se haya ingresado el nombre y categoría.
            //Consulto por el nombre del producto
            if (addressName.value === "")
            {
                addressName.classList.add('is-invalid');
                infoMissing = true;
            }
            
            //Consulto por la categoría del producto
            if (addressNumber.value === "")
            {
                addressNumber.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por la categoría del producto
            if (addressCorner.value === "")
            {
                addressCorner.classList.add('is-invalid');
                infoMissing = true;
            }
            
            if(!infoMissing)
            {
                //Aquí ingresa si pasó los controles, irá a enviar
                //la solicitud para crear la publicación.
    
                getJSONData(CART_BUY_URL).then(function(resultObj){
                    let msgToShowHTML = document.getElementById("buySpan");
                    let msgToShow = "";
        
                    //Si la publicación fue exitosa, devolverá mensaje de éxito,
                    //de lo contrario, devolverá mensaje de error.
                    if (resultObj.status === 'ok')
                    {
                        msgToShow = resultObj.data.msg;
                        document.getElementById("buyResult").classList.add('alert-success');
                    }
                    else if (resultObj.status === 'error')
                    {
                        msgToShow = ERROR_MSG;
                        document.getElementById("buyResult").classList.add('alert-danger');
                    }
        
                    msgToShowHTML.innerHTML = msgToShow;
                    document.getElementById("buyResult").classList.add("show");
                });
            }
    
            //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
            if (e.preventDefault) e.preventDefault();
                return false;
        });
});