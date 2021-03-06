const ORDER_ASC_BY_NAME = "AZ"; //para ordenar las categorías de la A a la Z
const ORDER_DESC_BY_NAME = "ZA"; // de la Z a la A
const ORDER_BY_PROD_COUNT = "Cant."; // para ordenar por cantidad
var currentCategoriesArray = []; // lista de categorías
var currentSortCriteria = undefined; // criterio de orden
var minCount = undefined;
var maxCount = undefined; // para ordenar según mín o máx

function sortCategories(criteria, array){ // función para ordenar las categorías
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
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){ // función para mostrar las categorías

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i]; //recorre la lista de categoria

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){
                // max o min de artículos en las categorias
            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){ // función para ORDENAR Y MOSTRAR las categorías
    currentSortCriteria = sortCriteria;     // se le pasa el orden de criterio al valor global

    if(categoriesArray != undefined){               // si está definido se le pasa la lista a ordenar al valor global
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    // aquí se pasa la lista ordenada con la función sortCategories con la lista y criterio acutales
    //Muestro las categorías ordenadas
    showCategoriesList();
}

/* Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes. */
document.addEventListener("DOMContentLoaded", function(e){ // evento a realizar según el botón en el html
    getJSONData(CATEGORIES_URL).then(function(resultObj){ // resultObj es lo que devuelve el JSONData
        if (resultObj.status === "ok"){ // veo si el status de ese resultado es ok
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data); // paso la data de ese resultado
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        /* Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        de productos por categoría. */
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});