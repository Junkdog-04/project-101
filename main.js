window.onload = function() {
  base_preguntas = readText("bdquestions.json")
  interprete_basepreguntas = JSON.parse(base_preguntas)
  escogerPreguntaAleatoria()
}

let pregunta
let posibles_respuestas
/*Revisar funciones de casos porque sólo existe un único uso tomando en cuenta 4 respuestas y cambiar las variables por nombres descriptivos para que sea
más entendible el código*/ 
btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4") 
]

preguntas = []

/*Puntaje*/
let preguntas_hechas = 0
let preguntas_correctas = 0

function escogerPreguntaAleatoria() {
  let pregunta = Math.floor(Math.random() * interprete_basepreguntas.length)
  // pregunta = 0 estado inicial

  while (preguntas.includes(pregunta)) {
    pregunta++
    if (pregunta >= interprete_basepreguntas.length) {
      pregunta = 0
    }
    if (preguntas.length == interprete_basepreguntas.length) {
      preguntas = []
    }
  }
  preguntas.push(pregunta)
  preguntas_hechas++

  escogerPregunta(pregunta)
}

function escogerPregunta(pregunta) {
  pregunta = interprete_basepreguntas[pregunta]
  select_id("pregunta").innerHTML = pregunta.pregunta
  select_id("numero").innerHTML = n
  let aciertos = preguntas_correctas
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = aciertos + "/" + (preguntas_hechas - 1)
  } else {
    select_id("puntaje").innerHTML = ""
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta)
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen)
    style("imagen").height = "200px"
    style("imagen").width = "100%"
  } else {
    style("imagen").height = "0px"
    style("imagen").width = "0px"
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "")
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ]
  posibles_respuestas.sort(() => Math.random() - 0.5) /*Generar error por no contestar */

  select_id("btn1").innerHTML = posibles_respuestas[0]
  select_id("btn2").innerHTML = posibles_respuestas[1]
  select_id("btn3").innerHTML = posibles_respuestas[2]
  select_id("btn4").innerHTML = posibles_respuestas[3]
}

let suspender_botones = false

function oprimir_btn(boton_presionado) {
  if (suspender_botones) {
    return
  }
  suspender_botones = true
  if (posibles_respuestas[boton_presionado] == pregunta.respuesta) {
    preguntas_correctas++
    boton_correspondiente[boton_presionado].style.background = "lightgreen" //Estado correcto
  } else {
    boton_correspondiente[boton_presionado].style.background = "pink" //Estado Incorrecto
  }

  //Iteración para verificar que los botones que sean presionados sean menores las 4 opciones
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      boton_correspondiente[j].style.background = "lightgreen"
      break
    }
  }
  setTimeout(() => {
    reiniciar()
    suspender_botones = false
  }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
  for (const boton of boton_correspondiente) {
    boton.style.background = "white"
  }
  escogerPreguntaAleatoria()
}

function select_id(id) {
  return document.getElementById(id)
}

function style(id) {
  return select_id(id).style
}

/*Refactorizar función para evitar utilizar xml*/
/*Verificar si la aplicación funciona con npm run dev*/
function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

