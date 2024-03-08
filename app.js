let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


// let titulo = document.querySelector ('h1'); SUBSTITUINDO A FUNÇÃO ABAIXO
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector ('p'); SUBSTITUINDO A FUNÇÃO ABAIXO
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10'; 

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou'); //mensagem quando o usuário acerta 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //ajustando a palavra do texto no plural
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas); //mensagem quando o usuário acerta 
        document.getElementById('reiniciar').removeAttribute('disabled'); //para habilitar o botão após acertar
    } else {
        if (chute > numeroSecreto) { //se o chute for maior que o número
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];  //para reiniciar a lista após acertar todos os números
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); //gerará um novo número
    limparCampo(); //limpará o campo
    tentativas = 1; //indicador de tentativas
    exibirMensagemInicial(); //texto inicial
    document.getElementById('reiniciar').setAttribute('disabled', true); //para desabilitar o botão ao acertar
}