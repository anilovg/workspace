var product = []; // Para la lista de productos
var comments = []; // Para la lista de comentarios

// Para las estrellas

const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

printRatingResult(ratingResult);

function executeRating(stars, result) { // Función para ejecutar la puntuación
   const starClassActive = "rating__star fas fa-star"; 
   const starClassUnactive = "rating__star far fa-star";
   const starsLength = stars.length;
   let i;
   stars.map((star) => {
      star.onclick = () => {
         i = stars.indexOf(star);

         if (star.className.indexOf(starClassUnactive) !== -1) {
            printRatingResult(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } else {
            printRatingResult(result, i);
            for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
         }
      };
   });
}

function printRatingResult(result, num = 0) {
   result;

}

executeRating(ratingStars, ratingResult);

// function showImagesGallery(array){ // Función para mostrar las imágenes

//     let htmlContentToAppend = "";

//     for(let i = 0; i < array.length; i++){
//         let imageSrc = array[i];

//         htmlContentToAppend += `
//         <div class="col-lg-3 col-md-4 col-6">
//             <div class="d-block mb-4 h-100">
//                 <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
//             </div>
//         </div>
//         `

//         document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
//     }
// }

function drawStars(stars){ // Función para mostrar estrellas según score

    let number = parseInt(stars);
    let htmlContentToAppend="";
    for(let i =1; i<=number;i++){
        htmlContentToAppend +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        htmlContentToAppend +=`<span class="fa fa-star"></span>`
    }    
    return htmlContentToAppend;

}

function saveComment() { // Función para guardar nuevo comentario
    let date = new Date();
    let formatDate = date.getFullYear().toString() + "-" + (date.getMonth() +1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0') + "  " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');

    let newComment = {
        description: document.getElementById('textarea').value, // Toma el comentario realizado
        dateTime: formatDate, // Muestra la fecha y hora creada anteriormente
        score: document.getElementById('score').value, // Toma el puntaje del select
        user: localStorage.getItem('username') // Toma el nombre de usuario del LS
    }

    comments.push(newComment); // Ingrego el nuevo comentario en la lista de comentarios
    showComments(); // Llamo a la función para mostrar los comentarios
}

function showComments(){ // Función para mostrar lista de comentarios

    let htmlContentToAppend = "";

    for (let i = comments.length - 1; i >= 0; i--) {
        let comment = comments[i];

        htmlContentToAppend += `<dl class="list-group-item">
                                    <dt>${comment.user} - ${drawStars(comment.score)}</dt>
                                    <dd>${comment.description}</dd>
                                    <dd class="text-muted">${comment.dateTime}</dd>
                                </dl>
                                
                                `


        document.getElementById('show-comment').innerHTML = htmlContentToAppend; // Para imprimir los comentarios
        document.getElementById("formulario").reset(); // Para resetear el formulario una vez enviado el comentario
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){ // Paso la lista con la información del producto
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSouldHTML = document.getElementById("productSould");
            let productCostHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSouldHTML.innerHTML += "Vendidos: " + product.soldCount;
            productCostHTML.innerHTML = product.currency + " " + product.cost + 
            ` <button class="btn btn-outline-success"><i class="fas fa-cart-plus"></i>
            <button class="btn btn-outline-danger"><i class="fas fa-heart"></i>`; // Botones para agregar al carrito y wishlist

            // showImagesGallery(product.images); // Muestro las imágenes
        }
    });
});


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){ // Paso la lista con los comentarios precargados
        if (resultObj.status === "ok"){
            
            comments = resultObj.data;
        }

        showComments(); // Muestro los comentarios

    });
});