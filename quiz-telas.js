const perguntasn = document.querySelector(".perguntas-n");
const perguntast = document.querySelector(".perguntas-t");
const opcao = document.querySelector(".opcao-container");
const indicadorRespostasContainer = document.querySelector(".resposta");
const caixaInicial = document.querySelector(".caixa-inicial");
const quiz = document.querySelector(".quiz");
const telaResultado = document.querySelector(".tela-resultado");

let nQuestoes = 0;
let questaoAtual;
let questaoAcessada = [];
let questaoOpcoes = [];
let respostaCorreta = 0;
let attempt = 0;


function setQuestaoAcessada(){
    const totalQuestoes = ap3.length;
    for(let i=0; i<totalQuestoes; i++){
        questaoAcessada.push(ap3[i])
    }
}

function getNovaQuestao(){
    perguntasn.innerHTML = "Questão " + (nQuestoes + 1) + " de " + ap3.length;
    const questaoIndex = questaoAcessada[Math.floor(Math.random() * questaoAcessada.length)]
    questaoAtual = questaoIndex
    perguntast.innerHTML = questaoAtual.q;
    const index1 = questaoAcessada.indexOf(questaoIndex);
    questaoAcessada.splice(index1, 1);
    const optionLen = questaoAtual.opcoes.length
    console.log(questaoAtual.opcoes)
    for(let i=0; i<optionLen; i++){
        questaoOpcoes.push(i)
   }
   
   opcao.innerHTML = '';
   let animationDelay = 0.2;
    for(let i=0; i<optionLen; i++){
        const optIndex = questaoOpcoes[Math.floor(Math.random() * questaoOpcoes.length)];
        const index2 = questaoOpcoes.indexOf(optIndex);
        questaoOpcoes.splice(index2,1);
        const opt = document.createElement("div");
        opt.innerHTML = questaoAtual.opcoes[optIndex];
        opt.id = optIndex;
        opt.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        opt.className = "opcoes";
        opcao.appendChild(opt)
        opt.setAttribute("onclick", "getResultado(this)")
    }
    nQuestoes++
}

function getResultado(elemento){
    const id = parseInt(elemento.id);
    if(id === questaoAtual.respostas){
        elemento.classList.add("correto");
        updateIndicadorRespostas("correto");
        respostaCorreta++;
        console.log("correto:"+respostaCorreta)

    }
    else{
        elemento.classList.add("errado");
        updateIndicadorRespostas("errado");
        
        const opcaoTam = opcao.children.length;
        for(let i=0; i<opcaoTam; i++){
            if(parseInt(opcao.children[i].id) === questaoAtual.respostas){
                opcao.children[i].classList.add("correto");
            }
    }

    }
    attempt++;
    opcaoNaoClicavel();
}



function opcaoNaoClicavel(){
    const opcaoTam = opcao.children.length;
    for(let i=0 ; i<opcaoTam; i++){
        opcao.children[i].classList.add("ja-respondida")
    }
}

function indicadorRespostas(){
    indicadorRespostas.innerHTML = '';
    const totalQuestoes = ap3.length
    for(let i=0; i<totalQuestoes; i++){
        const indicador = document.createElement("div");
        indicadorRespostasContainer.appendChild(indicador)
    }

}

function updateIndicadorRespostas(marktype){
    indicadorRespostasContainer.children[nQuestoes-1].classList.add(marktype)
}

function proximo(){
    if(nQuestoes === ap3.length){
        console.log("Quiz Finalizado");
        quizFinalizado();
    }
    else{
        getNovaQuestao();
    }

}

function quizFinalizado(){
    quiz.classList.add("ocultar");
    telaResultado.classList.remove("ocultar");
    resultadoquiz();
}

function resultadoquiz(){
    telaResultado.querySelector(".total-questoes").innerHTML = ap3.length;
    telaResultado.querySelector(".total-tentativas").innerHTML = attempt;
    telaResultado.querySelector(".total-corretas").innerHTML = respostaCorreta;
    telaResultado.querySelector(".total-erradas").innerHTML = attempt - respostaCorreta;
    const porcentagem = (respostaCorreta/ap3.length)*100;
    telaResultado.querySelector(".porcento").innerHTML = porcentagem.toFixed() + "%";
    telaResultado.querySelector(".total-pontuacao").innerHTML = respostaCorreta +"/" + ap3.length;
}

function resetQuiz(){
    nQuestoes = 0;
    respostaCorreta = 0;
    attempt = 0;

}

function tenteNovamenteQuiz(){
    telaResultado.classList.add("ocultar");
    quiz.classList.remove("ocultar");
    resetQuiz();

}

function finalizarQuiz(){
    telaResultadl.classList.add("ocultar");
    caixaInicial.remove("ocultar");
    resetQuiz();
}

function iniciarQuiz(){

    caixaInicial.classList.add("ocultar");
    quiz.classList.remove("ocultar");
    setQuestaoAcessada();
    
    getNovaQuestao();
    
    indicadorRespostas();
}
