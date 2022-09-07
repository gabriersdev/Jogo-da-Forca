let palavrasIniciais = ["LARANJA","BANANA","UVA","AMORA","KIWI","ABACATE","TOMATE","MEXERICA","CAJU","GOIABA","ABACAXI"];
palavrasIniciais = JSON.stringify(palavrasIniciais);

if(sessionStorage.getItem('palavras') == undefined){
  sessionStorage.setItem('palavras',palavrasIniciais);
}

let palavras = JSON.parse(sessionStorage.getItem('palavras'));
const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
console.log(palavras);
console.log(palavrasIniciais.length);
console.log(palavraSorteada);
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
          (charCode > 64 && charCode < 91) || 
          (charCode > 96 && charCode < 123)
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
  palavrasAntigas.push(novaPalavra);
  let arrayReformulado = JSON.stringify(palavrasAntigas);
  sessionStorage.setItem('palavras',arrayReformulado);

  setTimeout(() => {
    window.location.replace('./forca.html');
    location.replace();
  },1000);
}

document.addEventListener("keydown", (evento) => {
  let codigo = evento.keyCode;

  if(codigo > 64 && codigo < 91 || codigo > 96 && codigo < 123){
    const letra = (evento.key).toUpperCase();

    if(letrasErradas.includes(letra)){
      feedbackMensagem("mensagem","warning","Você já usou esta letra", "", 1500);
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
})

function atualizarJogo(){
  mostrarLetrasErradas();
  mostrarLetrasCorretas();
  desenharForca();
  verificarTentativa();
}

function mostrarLetrasErradas(){
  const divLetrasErradas = document.querySelector(".letras-erradas");
  divLetrasErradas.innerHTML = "";
  for(let i=0; i < letrasErradas.length; i++){
    divLetrasErradas.innerHTML += "<span>" + letrasErradas[i] + "</span>";
  }
}

function mostrarLetrasCorretas(){
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

function desenharForca(){
  let partesForca = document.querySelectorAll(".forca-parte");

  for(let i = 0; i < letrasErradas.length; i++){
    partesForca[i].style.display = 'block';
  }
}

function verificarTentativa(){
  const divLetrasCorretas = document.querySelector(".letras-corretas");

  if(letrasErradas.length >= 6){
    feedbackMensagem("popUp","","Fim de jogo", "Não foi dessa vez", "");
  }

  if(divLetrasCorretas.textContent == palavraSorteada){
    feedbackMensagem("popUp","","Parabéns, você acertou!", "A palavra era " + palavraSorteada, "");
  }

}


function recarregarPagina(){
  window.location.reload();
}

function feedbackMensagem(formato, icon, titulo, texto, tempo){
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
    // Swal.fire(
    //   `<h2>${titulo}</h2>
    //   <button class="btn-swal-adaptado" onclick='window.location.reload()'>Jogar novamente</button>`
    // )
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
        recarregarPagina();
      } else if (result.isDenied) {

      }
    })
  }

}