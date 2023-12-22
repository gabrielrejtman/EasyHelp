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