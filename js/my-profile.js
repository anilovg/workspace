let userprofile_info = {};


function getUserName() { // Función para mostrar el nombre de usuario guardado en LS si es que lo hay

    if(localStorage.getItem('username') !== null){ // Si en el LS hay un usuario lo muestra en el "username"

      document.getElementById('username-profile').value = window.localStorage.getItem('username');
    }

    else { // Si no hay un usuario en el LS se muestra un link para ir a iniciar sesión

      document.getElementById("profile-info").innerHTML = "<div class='text-center'><a href='index.html'>Debes de iniciar sesión para acceder a tu perfil</a></div>";

    } 
};


function setUserProfile(){ // Función para guardar los datos del usuario

    // Guardo los datos que ingresa el usuario en un objeto JS

    userprofile_info = {

    firstName:document.getElementById('name-profile').value,
    lastName:document.getElementById('lastname-profile').value,
    age:document.getElementById('age-profile').value,
    address:document.getElementById('address-profile').value,
    email:document.getElementById('email-profile').value,
    number:document.getElementById('number-profile').value,
    passwordValidation:document.getElementById('password').value,

    };

    // Los guardo en el LS con JSON.stringify

    window.localStorage.setItem('userprofile_info', JSON.stringify(userprofile_info));

    if(userprofile_info.firstName != "" && userprofile_info.lastName != "" && userprofile_info.age != "" && userprofile_info.address != "" && userprofile_info.email != "" && userprofile_info.number != ""
        && userprofile_info.passwordValidation == window.localStorage.getItem('password')){
            // La contraseña debe ser la misma con la que inició sesión

    window.location.href="./my-profile.html";

    }

    else{

        alert("Verifica que hayas completado todos los campos e ingresado tu contraseña correctamente")

    }
    
};  // Luego los muestros con la función window.onload del init.js


function previewFile() { // Función para guardar y mostrar la imagen de perfil

    var preview = document.getElementById('img-profile'); // Tomo lo que hay en la imagen del HTML
    var file = document.querySelector('input[type=file]').files[0]; // Veo que se guardó en el input file
    var reader = new FileReader();

    reader.onloadend = function () {

        preview.src = reader.result; 
        localStorage.setItem("img", reader.result) // Guardo la imagen en el LS

    }

    if (file){

        reader.readAsDataURL(file); // Si se guardó una imagen, la muestra

    } else{

        preview.src = "../img/avatar-profile.png"; // Si no hay, muestra una por defecto

    }

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getUserName(); // Obtengo el nombre de usuario

});