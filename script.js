//Array inicial, algumas palavras pré definidas
let palavrasIniciais = ["LARANJA","BANANA","UVA","AMORA","KIWI","ABACATE","TOMATE","MEXERICA","CAJU","GOIABA","ABACAXI"];
palavrasIniciais = JSON.stringify(palavrasIniciais);

//Salvando array com as palavras pré definidas em sessão caso não tenha sido salvo ainda
if(sessionStorage.getItem('palavras') == undefined){
  sessionStorage.setItem('palavras',palavrasIniciais);
}

let palavras = JSON.parse(sessionStorage.getItem('palavras'));
let palavraSorteada;
sortearPalavra();

//Função que sorteia as palavras
function sortearPalavra(){
  palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
}

//Algumas variáveis/arrays que serão usadas no decorrer do código
const tentativasDisponiveis = 5;
const letrasCorretas = [];
const letrasErradas = [];
mostrarLetrasCorretas();

//Função que tem como objetivo impedir que sejam inseridos letras com acento
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

//Função que converte valor de INPUT em maiusculo
function transformarEmMaiusculo(id){
  let letra = document.getElementById(id).value;
  letra = letra.toUpperCase();
  document.getElementById(id).value = letra;
}

//Função para adicionar uma palavras nova ao array (a palavra é salva na sessão)
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

//Função que apaga as palavras que foram adicionadas e depois insere as do padrão
function apagarPalavrasAdicionadas(){
  sessionStorage.clear();
  feedbackMensagem("mensagem","success","Palavras extras apagadas", "", 1000, "");
  setTimeout(() => {
    window.location.reload();
  },1000);
}

//Função que detecta se o que foi digitado é realmente um caractere (no caso letra) válido
function detectarLetras(codigo){
  if(codigo > 64 && codigo < 91){
    return true;
  }else{
    return false;
  }
}

//Basicamente, monitora quando o usuário digita algo na página e se for letra aciona a função para verificar se aquele caractere é válido para a palavra
document.addEventListener("keydown", (evento) => {
  let codigo = evento.keyCode;

  if(detectarLetras(codigo)){
    const letra = (evento.key).toUpperCase();

    verificarCaractereDigitado(letra);
  }
});

//Verifica se a última letra digitada no input é válida para o script
function verificarTextoDigitado(valor){
  let ultimaLetra = valor[(valor.length)-1].toUpperCase();
  let codigoLetra = converterLetraParaCodigo(ultimaLetra);

  if(detectarLetras(codigoLetra)){
    verificarCaractereDigitado(ultimaLetra);
  }
}

//"Converte" uma letra para um código, para que a função de verificação de caractere seja capaz de reconhecê-lo como válido para a palavra
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

//Verifica se o caractere recebido é válido para a palavra e aciona outras funções de apresentação
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

//Atualiza as informações na página, executando as funções
function atualizarJogo(){
  mostrarLetrasErradas();
  mostrarLetrasCorretas();
  desenharForca();
  verificarTentativa();
}

//Mostra as letras digitadas que não pertencem a palavra sorteada
function mostrarLetrasErradas(){
  if(letrasErradas.length < 6){
    const divLetrasErradas = document.querySelector(".letras-erradas");
    divLetrasErradas.innerHTML = "";
    for(let i=0; i < letrasErradas.length; i++){
      divLetrasErradas.innerHTML += "<span>" + letrasErradas[i] + "</span>";
    }
  }
}

//Mosta "_" caso ainda falte letras para completar a palavra, se não faltar a letra naquela posição é exibida
function mostrarLetrasCorretas(){
  try{
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
  }catch(error){
    console.info('');
  }
}

//Responsável por desenhar a forca e os elementos dela, conforme o usuário erra uma letra
function desenharForca(){
  let partesForca = document.querySelectorAll(".forca-parte");

  for(let i = 0; i < letrasErradas.length; i++){
    partesForca[i].style.display = 'block';
  }
}

//Verifica se o usuário perdeu (usou as tentativas) ou se ele venceu (acertou a palavra)
function verificarTentativa(){
  const divLetrasCorretas = document.querySelector(".letras-corretas");

  if(letrasErradas.length >= 6){
    feedbackMensagem("popUp","","Fim de jogo", "Não foi dessa vez", "", "jogo-encerrado");
  }

  if(divLetrasCorretas.textContent == palavraSorteada && letrasErradas.length < 6){
    feedbackMensagem("popUp","","Parabéns, você acertou!", "A palavra era " + palavraSorteada, "", "jogo-encerrado");
  }

}

//Exibe ou oculta o teclado - criado para uso em dispositivos móveis
function controlarTeclado(){
  teclado = document.querySelector("#teclado");
  if(teclado.style.display == 'none'){
    feedbackMensagem("mensagem","info","Use esta caixa de preenchimento apenas você não tem um teclado físico", "", 2000,"");

    teclado.style.display = 'flex';
    setTimeout(() => {teclado.focus();}, 2500);
  }else{
    teclado.style.display = 'none';
  }
}

//Recarrega a página 
function recarregarPagina(){
  window.location.reload();
}

//Formata o sweet alert que é usado várias vezes ao longo do código
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
