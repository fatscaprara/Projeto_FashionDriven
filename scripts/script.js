let verificaModelo;
let verificaGola;
let verificaTecido;
let url;
let idInterval;
let urlAPI = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let modeloEscolhido;
let golaEscolhida;
let tecidoEscolhido;

let nome = prompt("Qual é o seu nome?");

function selecionarModelo(modeloClicado){
    let modeloSelecionado = document.querySelector(".secao-escolher-modelo .selecionado");

    if(modeloSelecionado !== null){
        modeloSelecionado.classList.remove("selecionado");
    }

    modeloClicado.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-modelo .selecionado");

    if(elementoSelecionado !== null){
        verificaModelo = true;
    } else {
        verificaModelo = false;
    }

    modeloEscolhido = modeloClicado.querySelector("h3").innerHTML;
    console.log(modeloEscolhido);
}

function selecionarGola(golaClicada){
    let golaSelecionada = document.querySelector(".secao-escolher-gola .selecionado");

    if(golaSelecionada !== null){
        golaSelecionada.classList.remove("selecionado");
    }

    golaClicada.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-gola .selecionado");

    if(elementoSelecionado !== null){
        verificaGola = true;
    } else {
        verificaGola = false;
    }

    golaEscolhida = golaClicada.querySelector("h3").innerHTML;
    console.log(golaEscolhida);
}

function selecionarTecido(tecidoClicado){
    let tecidoSelecionado = document.querySelector(".secao-escolher-tecido .selecionado");

    if(tecidoSelecionado !== null){
        tecidoSelecionado.classList.remove("selecionado");
    }

    tecidoClicado.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-tecido .selecionado");

    if(elementoSelecionado !== null){
        verificaTecido = true;
    } else {
        verificaTecido = false;
    }

    tecidoEscolhido = tecidoClicado.querySelector("h3").innerHTML;
    console.log(tecidoEscolhido);
}

function verificarPedido(){
    let botaoConfirmar = document.querySelector(".btn-confirmar-pedido");
    console.log("verificando...")
    if(verificaModelo && verificaGola && verificaTecido && validaURL()){
        botaoConfirmar.classList.add("btn-selecionado");
        botaoConfirmar.removeAttribute("disabled");
    } else {
        botaoConfirmar.classList.remove("btn-selecionado");
        document.querySelector(".container-btn").innerHTML = `
            <button class="btn-confirmar-pedido" onclick="confirmarEncomenda()" disabled>Confirmar pedido</button>
        `
    }
}

function validaURL() {
    const regularExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    url = document.querySelector(".input-imagem-referencia").value;
    return regularExpression.test(url);
}

function confirmarEncomenda(){

    const promise = axios.post(urlAPI)
}