let verificaModelo, verificaGola, verificaTecido;
let urlImage;
let urlAPI = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let modeloEscolhido, golaEscolhida, tecidoEscolhido;
let encomendasRecentes;

let nome = prompt("Qual é o seu nome?");

function selecionarModelo(modeloClicado) {
    let modeloSelecionado = document.querySelector(".secao-escolher-modelo .selecionado");

    if (modeloSelecionado !== null) {
        modeloSelecionado.classList.remove("selecionado");
    }

    modeloClicado.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-modelo .selecionado");

    if (elementoSelecionado !== null) {
        verificaModelo = true;
    } else {
        verificaModelo = false;
    }

    modeloEscolhido = modeloClicado.getAttribute("name");
    console.log(modeloEscolhido);

    verificarPedido();
}

function selecionarGola(golaClicada) {
    let golaSelecionada = document.querySelector(".secao-escolher-gola .selecionado");

    if (golaSelecionada !== null) {
        golaSelecionada.classList.remove("selecionado");
    }

    golaClicada.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-gola .selecionado");

    if (elementoSelecionado !== null) {
        verificaGola = true;
    } else {
        verificaGola = false;
    }

    golaEscolhida = golaClicada.getAttribute("name");
    console.log(golaEscolhida);

    verificarPedido();
}

function selecionarTecido(tecidoClicado) {
    let tecidoSelecionado = document.querySelector(".secao-escolher-tecido .selecionado");

    if (tecidoSelecionado !== null) {
        tecidoSelecionado.classList.remove("selecionado");
    }

    tecidoClicado.querySelector(".container-imagem-div").classList.add("selecionado");

    let elementoSelecionado = document.querySelector(".secao-escolher-tecido .selecionado");

    if (elementoSelecionado !== null) {
        verificaTecido = true;
    } else {
        verificaTecido = false;
    }

    tecidoEscolhido = tecidoClicado.getAttribute("name");
    console.log(tecidoEscolhido);

    verificarPedido();
}

function verificarPedido() {
    let botaoConfirmar = document.querySelector(".btn-confirmar-pedido");
    console.log("verificando...");
    if (verificaModelo && verificaGola && verificaTecido && validaURL()) {
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
    urlImage = document.querySelector(".input-imagem-referencia").value;
    return regularExpression.test(urlImage);
}

function confirmarEncomenda() {
    let encomenda = {
        "model": modeloEscolhido,
        "neck": golaEscolhida,
        "material": tecidoEscolhido,
        "image": urlImage,
        "owner": nome,
        "author": nome
    }
    console.log(encomenda);

    const promise = axios.post(urlAPI, encomenda);

    promise.catch(tratarFalhaFazerPedido);
    promise.then(tratarSucessoFazerPedido);
}

function tratarSucessoFazerPedido() {
    alert("Sua encomenda foi confirmada!");
    mostrarEncomendasRecentes();
}

function tratarFalhaFazerPedido() {
    alert("Ops, não conseguimos processar sua encomenda");
}

function mostrarEncomendasRecentes() {
    const promise = axios.get(urlAPI);

    promise.catch(tratarFalhaEncomendasRecentes);
    promise.then(tratarSucessoEncomendasRecentes);
}

function tratarSucessoEncomendasRecentes(response) {
    encomendasRecentes = response.data;
    console.log(encomendasRecentes);

    document.querySelector(".blusas").innerHTML = '';

    for (let i = 0; i < encomendasRecentes.length; i++) {
        document.querySelector(".blusas").innerHTML += `
                <div class="blusa">
                    <img src="${encomendasRecentes[i].image}" alt="Imagem de uma blusa" class="img-blusa" onclick="encomendarBlusasPorClique(this)">
                    <h3><strong>Criador: </strong>${encomendasRecentes[i].owner}</h3>
                </div>
        `
    }
}

function tratarFalhaEncomendasRecentes() {
    console.log("deu falha aqui");
}

function encomendarBlusasPorClique(blusaClicada) {
    let resposta = confirm("Tem certeza que deseja realizar essa encomenda?");
    console.log(resposta);
    if (resposta === true) {
        let src = blusaClicada.getAttribute("src");
        console.log(src);
        let elementoBuscado = encomendasRecentes.find(receptor => receptor.image === src);
        console.log(elementoBuscado);

        let encomenda = {
            "model": elementoBuscado.model,
            "neck": elementoBuscado.neck,
            "material": elementoBuscado.material,
            "image": elementoBuscado.image,
            "owner": nome,
            "author": elementoBuscado.owner
        }

        console.log(encomenda);

        const promise = axios.post(urlAPI, encomenda);

        promise.catch(tratarFalhaFazerPedido);
        promise.then(tratarSucessoFazerPedido);
    }
}

mostrarEncomendasRecentes();