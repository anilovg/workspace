const ORDER_ASC_BY_COST = "0-9"; // para ordenar los productos de menor a mayor precio
const ORDER_DESC_BY_COST = "9-0"; // de mayor a menor precio
const ORDER_BY_PROD_SOLD = "Cant."; // para ordenar por cantidad de productos vendidos
const ORDER_BY_COST = "Precio" // para ordenar por precio
var currentProductsArray = []; // lista de productos
var currentSortCriteria = undefined; // criterio de orden
var minCost = undefined;
var maxCost = undefined; // para ordenar según mín o máx precio
var minSold = undefined;
var maxSold = undefined; // para ordenar por relevancia

function sortProducts(criteria, array){ // función para ordenar los productos según el orden establecido por el botón
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) // para ordenar de menor a mayor costo
    {
        result = array.sort(function(a, b){
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        
    }else if (criteria === ORDER_DESC_BY_COST){ // para ordenar de mayor a menor costo
        result = array.sort(function(a, b){
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

    }else if (criteria === ORDER_BY_PROD_SOLD){ // para ordenar por productos más vendidos
        result = array.sort(function(a, b){
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){ // función para mostrar los productos en el HTML

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i]; // recorre la lista de productos

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){ 
                // max o min de precio 

            htmlContentToAppend += ` 
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
                <div class="text-right">
                            <h4> `+ product.currency +` `+ product.cost +`</h4>
                        </div>
            </a>
            `
        }

        document.getElementById("product-container").innerHTML = htmlContentToAppend;
    } // colocando el contenido en el HTML
}

function sortAndShowProducts(sortCriteria, productsArray){ // función para ORDENAR Y MOSTRAR los productos
    currentSortCriteria = sortCriteria; // el criterio que se le da por parámetro pasa a ser el "criterio actual"

    if(productsArray != undefined){
        currentProductsArray = productsArray; // si se le da por parámetro una lista, pasa a ser la lista actual a ordenar
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    // se usa la función sortProducts para ordenar la lista según el criterio y queda guardada 
    // en la variable currentProductsAarray
    
    showProductsList(); // Muestro los productos ordenadas
}

/* Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes. */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ // paso la url de productos al JSON y me devuelve el resultObj
        if (resultObj.status === "ok"){                 // si resultObj está ok procede con la funcion sortAndShowProducts
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){ // Para limpiar el filtro
        document.getElementById("rangeFilterMinCost").value = "";
        document.getElementById("rangeFilterMaxCost").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        // Obtengo el mínimo y máximo de los intervalos para filtrar por precio.
        minCost = document.getElementById("rangeFilterMinCost").value;
        maxCost = document.getElementById("rangeFilterMaxCost").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
    
});