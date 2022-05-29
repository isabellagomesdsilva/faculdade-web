export function obterDadosCep(cep) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xhr.onreadystatechange=function() {
        if(xhr.readyState == 4) {
            const dadosCep = JSON.parse(xhr.responseText);

            var campoRua = document.getElementById("Rua");
            var campoBairro = document.getElementById("Bairro");
            var campoCidade = document.getElementById("Cidade");

            campoRua.value = dadosCep.logradouro;
            campoBairro.value = dadosCep.bairro;
            campoCidade.value = dadosCep.localidade;
        }
    }
    xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`, true);
    xhr.setRequestHeader('Accept', '*\/*');
    xhr.send(null);
}

export function preencherEndereco(dadosCep) {
    var campoRua = document.getElementById("Rua");
    var campoBairro = document.getElementById("Bairro");
    var campoCidade = document.getElementById("Cidade");

    campoRua.value = dadosCep.logradouro;
    campoBairro.value = dadosCep.bairro;
    campoCidade.value = dadosCep.localidade;
}