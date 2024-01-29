function redirectToMain() {
    window.location.href = "inserir_problema.html";
    return false; // Cancela o envio do formulário
  }
  

function logout() {
    window.location.href = "login.html"
}

// Adiciona um ouvinte de eventos ao elemento com ID "logout"
document.getElementById("logout").addEventListener("click", function() {
    // Redireciona para a página desejada
    window.location.href = "login.html";
});


function mostrarSenha() {
    var senhaInput = document.getElementById("senha");
    var eyeIcon = document.getElementById("eye");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        senhaInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}


function redirectToMain() {
    return true; 
  }
