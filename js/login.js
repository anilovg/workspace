//funcion para validar el usuario de index.html

function validarUsuario(){

    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('clave').value;
    if((user.length >=6 && user.length <=8) && (pass.length >=6 && pass.length <=8)){
        window.location.href="./inicio.html";
    }
    else{
        alert("Usuario y/o contraseña incorrectos")
    }
}