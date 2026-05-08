const pvMax = 65

const campo = document.getElementById("valorPV")

// carregar
window.addEventListener("load", () => {

const salvo = localStorage.getItem("pvAtual")

if(salvo){
document.getElementById("pvAtual").innerText = salvo
}else{
document.getElementById("pvAtual").innerText = pvMax
}

atualizarBarra()

// 🔥 NOVO BLOCO
const estadoCritico = localStorage.getItem("emEstadoCritico")
const tentativasSalvas = localStorage.getItem("tentativasMorte")

if(estadoCritico === "true"){

emEstadoCritico = true
tentativasMorte = Number(tentativasSalvas) || 0

abrirModalMorte()

}else{

verificarMorte()

}

})

// ENTER
campo.addEventListener("keydown", function(event){
if(event.key === "Enter"){
alterarPV()
verificarMorte()
}
})


// COR VISUAL INPUT
campo.addEventListener("input", function(){

let texto = campo.value.trim()

campo.classList.remove("cura","dano")

if(texto.startsWith("+")){
campo.classList.add("cura")
}
else if(texto !== ""){
campo.classList.add("dano")
}

})

// ALTERAR PV
function alterarPV(){

let pv = document.getElementById("pvAtual")

let atual = Number(pv.innerText)

let texto = campo.value.trim()

// cura
if(texto.startsWith("+")){

let cura = Number(texto)

atual += cura

if(atual > pvMax) atual = pvMax

}else{

let dano = Number(texto)

atual -= dano

if(atual < -(pvMax * 0.5)) atual = -(pvMax * 0.5)

}

pv.innerText = atual

localStorage.setItem("pvAtual", atual)

campo.value = ""
campo.classList.remove("cura","dano")

atualizarBarra()

}

// PV TEMPORÁRIO
function tempPV(valor){

let pv = document.getElementById("pvAtual")

let atual = Number(pv.innerText)

atual += valor

pv.innerText = atual

atualizarBarra()
verificarMorte()

}

// RESET
function resetPV(){

document.getElementById("pvAtual").innerText = pvMax

localStorage.setItem("pvAtual", pvMax)

atualizarBarra()

}

// BARRA COMPLETA
function atualizarBarra(){

let atual = Number(document.getElementById("pvAtual").innerText)

let barra = document.getElementById("barraVida")

// largura
let porcentagem = (Math.min(atual,pvMax) / pvMax) * 100

barra.style.width = porcentagem + "%"

// PV TEMP
if(atual > pvMax){

barra.style.background = "deepskyblue"

}else{

if(porcentagem > 68){
barra.style.background = "green"
}
else if(porcentagem > 34){
barra.style.background = "orange"
}
else{
barra.style.background = "red"
}

}

// crítico pulsando
if(atual <= pvMax / 4){
barra.classList.add("barraCritica")
}else{
barra.classList.remove("barraCritica")
}

}



let tentativasMorte = 0
let emEstadoCritico = false

function verificarMorte(){

let atual = Number(document.getElementById("pvAtual").innerText)

// só ativa uma vez
if(atual <= -(pvMax * 0.1) && !emEstadoCritico){

emEstadoCritico = true
tentativasMorte = 0

// SALVA
localStorage.setItem("emEstadoCritico", "true")
localStorage.setItem("tentativasMorte", "0")

abrirModalMorte()
}

}

// ABRE MODAL
function abrirModalMorte(){

document.getElementById("modalMorte").style.display = "flex"

}

// RESULTADO DO TESTE
function resultadoMorte(passou){
    
    localStorage.removeItem("emEstadoCritico")
    localStorage.removeItem("tentativasMorte")

document.getElementById("modalMorte").style.display = "none"

if(passou){

emEstadoCritico = false
tentativasMorte = 0

// zera o PV
let pv = document.getElementById("pvAtual")
pv.innerText = 0

localStorage.setItem("pvAtual", 0)

atualizarBarra()

// muda texto do modal
document.getElementById("textoMorte").innerText =
"Parabéns, Malahin te deu uma segunda chance, você resistiu e sobreviverá!"

// esconde botões de teste
document.getElementById("botoesMorte").style.display = "none"

// mostra botão continuar
document.getElementById("btnContinuar").style.display = "inline-block"

return
}else{

tentativasMorte++

localStorage.setItem("tentativasMorte", tentativasMorte)

if(tentativasMorte >= 3){

mostrarGameOver()

return
}

// tenta novamente depois de 20 segundos
setTimeout(() => {
abrirModalMorte()
}, 10000)

}

}

function fecharModalMorte(){

document.getElementById("modalMorte").style.display = "none"

// reset visual do modal para próxima vez
document.getElementById("textoMorte").innerText =
"Você está à beira da morte. Faça um teste de resistência para sobreviver."

document.getElementById("botoesMorte").style.display = "flex"

document.getElementById("btnContinuar").style.display = "none"

}

const checkboxes = document.querySelectorAll(".magia")

checkboxes.forEach(box => {

const salvo = localStorage.getItem(box.id)

if(salvo === "true"){
box.checked = true
}

box.addEventListener("change", () => {
localStorage.setItem(box.id, box.checked)
})

})


const linhas = document.querySelectorAll(".linha-magia")

linhas.forEach(linha => {

const max = Number(linha.dataset.max)
const checkboxes = linha.querySelectorAll(".magia")
const restante = linha.querySelector(".restante")

function atualizar(){

let usados = 0

checkboxes.forEach(box=>{
if(box.checked){
usados += Number(box.dataset.cost)
}
})

restante.innerText = max - usados

}

checkboxes.forEach(box=>{
box.addEventListener("change", atualizar)
})

atualizar()

})




  document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.portfolio-filter .filter');
    const items = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 1. Pega o valor do filtro e limpa o ponto (ex: ".truques" -> "truques")
            let filterValue = this.getAttribute('data-filter').replace('.', '');

            // 2. Remove a classe de destaque de todos os botões e coloca no atual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 3. Lógica de Esconder/Mostrar corrigida
            items.forEach(item => {
                // Se for "all", mostra tudo
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } 
                // Se o item tiver a classe correspondente ao filtro, mostra
                else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } 
                // Se não for nenhum dos dois, esconde obrigatoriamente
                else {
                    item.style.display = 'none';
                }
            });
        });
    });
});




    // 1. Bloqueia o clique com o botão direito (Menu de Contexto)
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 2. Bloqueia atalhos de teclado comuns para desenvolvedores
    document.onkeydown = function(e) {
        // Bloqueia F12
        if(e.keyCode == 123) {
            return false;
        }
        // Bloqueia Ctrl+Shift+I (Inspecionar)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        // Bloqueia Ctrl+Shift+C (Selecionar elemento)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        // Bloqueia Ctrl+Shift+J (Console)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        // Bloqueia Ctrl+U (Exibir código fonte)
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }
    

function mostrarGameOver(){

document.getElementById("gameOver").style.display = "flex"

}

function reviver(){

document.getElementById("gameOver").style.display = "none"

let pv = document.getElementById("pvAtual")

pv.innerText = pvMax

localStorage.setItem("pvAtual", pvMax)

emEstadoCritico = false
tentativasMorte = 0

atualizarBarra()

}