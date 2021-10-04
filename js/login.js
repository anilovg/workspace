// Función para validar el usuario de index.html

function validarUsuario(){

    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('clave').value;
    window.localStorage.setItem('username', user); // Guardo el nombre de usuario
    if((user.length >=6 && user.length <=8) && (pass.length >=6 && pass.length <=8)){

        window.location.href="./inicio.html";

    }

    else{
        alert("Usuario y/o contraseña incorrectos") 
    }
}

// Función para el estilo del login

const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});