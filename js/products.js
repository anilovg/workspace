const ORDER_ASC_BY_NAME = "AZ"; //para ordenar los productos de la A a la Z
const ORDER_DESC_BY_NAME = "ZA"; // de la Z a la A
const ORDER_BY_PROD_SOLD = "Cant."; // para ordenar por cantidad de productos vendidos
var currentProductsArray = []; // lista de productos
var currentSortCriteria = undefined; // criterio de orden
var minSold = undefined;
var maxSold = undefined; // para ordenar según mín o máx

function sortProducts(criteria, array){ // función para ordenar los productos
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) // para ordenar según el orden establecido
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aSold = parseInt(a.productSold);
            let bSold = parseInt(b.productSold);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){ // función para mostrar los productos

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i]; //recorre la lista de productos

        if (((minSold == undefined) || (minSold != undefined && parseInt(product.soldCount) >= minSold)) &&
            ((maxSold == undefined) || (maxSold != undefined && parseInt(product.soldCount) <= maxSold))){
                // max o min de  productos vendidos
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

        document.getElementById("product-container").innerHTML = htmlContentToAppend; // contenedor para colocar el contenido en el html
    }
}

function sortAndShowProducts(sortCriteria, productsArray){ // función para ORDENAR Y MOSTRAR los productos
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenadas
    showProductsList();
}

/* Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes. */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterSoldMin").value = "";
        document.getElementById("rangeFilterSoldMax").value = "";

        minSold = undefined;
        maxSold = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterSold").addEventListener("click", function(){
        /* Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        de productos vendidos. */
        minSold = document.getElementById("rangeFilterSoldMin").value;
        maxSold = document.getElementById("rangeFilterSoldMax").value;

        if ((minSold != undefined) && (minSold != "") && (parseInt(minSold)) >= 0){
            minSold = parseInt(minSold);
        }
        else{
            minSold = undefined;
        }

        if ((maxSold != undefined) && (maxSold != "") && (parseInt(maxSold)) >= 0){
            maxSold = parseInt(maxSold);
        }
        else{
            maxSold = undefined;
        }

        showProductsList();
    });
});