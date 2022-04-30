let nome = prompt("Qual é o seu nome?");

function selecionarModelo(modeloClicado){
    let modeloSelecionado = document.querySelector(".secao-escolher-modelo .selecionado");

    if(modeloSelecionado !== null){
        modeloSelecionado.classList.remove("selecionado");
    }

    modeloClicado.classList.add("selecionado");
}

function selecionarGola(golaClicada){
    let golaSelecionada = document.querySelector(".secao-escolher-gola .selecionado");

    if(golaSelecionada !== null){
        golaSelecionada.classList.remove("selecionado");
    }

    golaClicada.classList.add("selecionado");
}

function selecionarTecido(tecidoClicado){
    let tecidoSelecionado = document.querySelector(".secao-escolher-tecido .selecionado");

    if(tecidoSelecionado !== null){
        tecidoSelecionado.classList.remove("selecionado");
    }

    tecidoClicado.classList.add("selecionado");
}
