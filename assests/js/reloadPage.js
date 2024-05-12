;(function(){
    
    function confirmarAtualizacao() {
        var confirmacao = confirm("Tem certeza que deseja atualizar a página?");
        if (confirmacao) {
            window.location.reload();
        }
    }

    window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

})()