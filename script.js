let palavrasIniciais = ["LARANJA","BANANA","UVA","AMORA","KIWI","ABACATE","TOMATE","MEXERICA","CAJU","GOIABA","ABACAXI"];
palavrasIniciais = JSON.stringify(palavrasIniciais);

if(sessionStorage.getItem('palavras') == undefined){
  sessionStorage.setItem('palavras',palavrasIniciais);
}

let palavras = JSON.parse(sessionStorage.getItem('palavras'));
let palavraSorteada;
sortearPalavra();

function sortearPalavra(){
  palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
}

// console.log(palavras);
// console.log(palavrasIniciais.length);
// console.log(palavraSorteada);
const tentativasDisponiveis = 5;
const letrasCorretas = [];
const letrasErradas = [];
mostrarLetrasCorretas();

function apenasLetrasSemAcento(e) {
  try {
      if (window.event) {
          var charCode = window.event.keyCode;
      } else if (e) {
          var charCode = e.which;
      } else {
          return true;
      }
      if (
          (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
      ){
          return true;
      } else {
          return false;
      }
  } catch (err) {
      alert(err.Description);
  }
}

function transformarEmMaiusculo(id){
  let letra = document.getElementById(id).value;
  letra = letra.toUpperCase();
  document.getElementById(id).value = letra;
}

function adicionarPalavra(){
  let palavra = document.querySelector("#input-nova-palavra").value;
  let novaPalavra = palavra.toUpperCase();

  let palavrasAntigas = JSON.parse(sessionStorage.getItem('palavras'));
  let palavraJaExiste = false;

  for(let i=0; i < palavrasAntigas.length; i++){
    if(palavrasAntigas[i] == novaPalavra){
      palavraJaExiste = true;
      break;
    }
  }

  if(palavraJaExiste == false){
    palavrasAntigas.push(novaPalavra);
    let arrayReformulado = JSON.stringify(palavrasAntigas);
    sessionStorage.setItem('palavras',arrayReformulado);
    
    feedbackMensagem("mensagem","success","Palavra adicionada", "", 1500, "");

    setTimeout(() => {
      window.location.replace('./forca.html');
      location.replace();
    },1000);
  }else{
    feedbackMensagem("mensagem","error","Esta palavra já existe", "", 1500, "");
  }

}

function apagarPalavrasAdicionadas(){
  sessionStorage.clear();
  feedbackMensagem("mensagem","success","Palavras extras apagadas", "", 1000, "");
  setTimeout(() => {
    window.location.reload();
  },1000);
}

function detectarLetras(codigo){
  if(codigo > 64 && codigo < 91){
    return true;
  }else{
    return false;
  }
}

document.addEventListener("keydown", (evento) => {
  let codigo = evento.keyCode;

  if(detectarLetras(codigo)){
    const letra = (evento.key).toUpperCase();

    verificarCaractereDigitado(letra);
  }
});

function verificarTextoDigitado(valor){
  let ultimaLetra = valor[(valor.length)-1].toUpperCase();
  let codigoLetra = converterLetraParaCodigo(ultimaLetra);
  // console.log(codigoLetra);
  // console.log(ultimaLetra);

  if(detectarLetras(codigoLetra)){
    // console.log("rodou");
    verificarCaractereDigitado(ultimaLetra);
  }
}

function converterLetraParaCodigo(letra){
  
  let codigoLetra;

  switch (letra){
    case 'A':
      codigoLetra = 65;
      break;

    case 'B':
      codigoLetra = 66;
      break;

    case 'C':
      codigoLetra = 67;
      break;

    case 'D':
      codigoLetra = 68;
      break;

    case 'E':
      codigoLetra = 69;
      break;

    case 'F':
      codigoLetra = 70;
      break;

    case 'G':
      codigoLetra = 71;
      break;

    case 'H':
      codigoLetra = 72;
      break;

    case 'I':
      codigoLetra = 73;
      break;

    case 'J':
      codigoLetra = 74;
      break;

    case 'K':
      codigoLetra = 75;
      break;

    case 'L':
      codigoLetra = 76;
      break;

    case 'M':
      codigoLetra = 77;
      break;

    case 'N':
      codigoLetra = 78;
      break;

    case 'O':
      codigoLetra = 79;
      break;

    case 'P':
      codigoLetra = 80;
      break;

    case 'Q':
      codigoLetra = 81;
      break;

    case 'R':
      codigoLetra = 82;
      break;

    case 'S':
      codigoLetra = 83;
      break;

    case 'T':
      codigoLetra = 84;
      break;

    case 'U':
      codigoLetra = 85;
      break;

    case 'V':
      codigoLetra = 86;
      break;

    case 'W':
      codigoLetra = 87;
      break;

    case 'X':
      codigoLetra = 88;
      break;

    case 'Y':
      codigoLetra = 89;
      break;

    case 'Z':
      codigoLetra = 90;
      break;
  }

  return codigoLetra;
}

function verificarCaractereDigitado(letra){
  if(letrasErradas.includes(letra)){
    feedbackMensagem("mensagem","warning","Você já usou esta letra", "", 1500, "");
  }
  
  else{
    if(palavraSorteada.includes(letra)){
      letrasCorretas.push(letra);
    }else{
      letrasErradas.push(letra);
    }
  }
  
  atualizarJogo();
}

function atualizarJogo(){
  mostrarLetrasErradas();
  mostrarLetrasCorretas();
  desenharForca();
  verificarTentativa();
}

function mostrarLetrasErradas(){
  if(letrasErradas.length < 6){
    const divLetrasErradas = document.querySelector(".letras-erradas");
    divLetrasErradas.innerHTML = "";
    for(let i=0; i < letrasErradas.length; i++){
      divLetrasErradas.innerHTML += "<span>" + letrasErradas[i] + "</span>";
    }
  }
}

function mostrarLetrasCorretas(){
  if(letrasErradas.length < 6){
    const divLetrasCorretas = document.querySelector(".letras-corretas");
    divLetrasCorretas.innerHTML = "";
    palavraSorteada.split("").forEach(letra => {
      if(letrasCorretas.includes(letra)){
        divLetrasCorretas.innerHTML += "<span>" + letra + "</span>";
      }else{
        divLetrasCorretas.innerHTML += "<span>" + "_" + "</span>";
      }
    });
  }
}

function desenharForca(){
  let partesForca = document.querySelectorAll(".forca-parte");

  for(let i = 0; i < letrasErradas.length; i++){
    partesForca[i].style.display = 'block';
  }
}

function verificarTentativa(){
  const divLetrasCorretas = document.querySelector(".letras-corretas");

  if(letrasErradas.length >= 6){
    feedbackMensagem("popUp","","Fim de jogo", "Não foi dessa vez", "", "jogo-encerrado");
  }

  if(divLetrasCorretas.textContent == palavraSorteada && letrasErradas.length < 6){
    feedbackMensagem("popUp","","Parabéns, você acertou!", "A palavra era " + palavraSorteada, "", "jogo-encerrado");
  }

}

function controlarTeclado(){
  teclado = document.querySelector("#teclado");
  if(teclado.style.display == 'none'){
    // feedbackMensagem("mensagem","info","Use esta caixa de preenchimento apenas você não tem um teclado físico", "", 3000);
    feedbackMensagem("mensagem","info","Use esta caixa de preenchimento apenas você não tem um teclado físico", "", 2000,"");

    teclado.style.display = 'flex';
    setTimeout(() => {teclado.focus();}, 2500);
  }else{
    teclado.style.display = 'none';
  }
}

function recarregarPagina(){
  window.location.reload();
}

function feedbackMensagem(formato, icon, titulo, texto, tempo, tipo){
  if(formato == "mensagem"){
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: titulo,
      text: texto,
      showConfirmButton: false,
      timer: tempo
    })
  }else if(formato.toLowerCase() == "popup"){
    if(tipo == "jogo-encerrado"){
      Swal.fire({
        title: titulo,
        text: texto,
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Jogar novamente',
        denyButtonText: `OK`,
      }).then((result) => {
        if (result.isConfirmed) {

          while(letrasCorretas.length){
            letrasCorretas.pop();
          }
          
          while(letrasErradas.length){
            letrasErradas.pop();
          }

          document.querySelector("#teclado").value = "";
          sortearPalavra();
          atualizarJogo();
        } else if (result.isDenied) {
  
        }
      })
    }else if(tipo == "aviso-importante"){
      Swal.fire({
        icon: icon,
        title: titulo,
        text: texto
      })
    }
  }

}