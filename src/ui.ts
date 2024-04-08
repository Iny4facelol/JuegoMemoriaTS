import './style.css'
import { tablero, cartas, Carta } from "./model.ts";
import { barajarCartas, esPartidaCompleta, sePuedeVoltearLaCarta, sonPareja } from "./motor.ts";




const handleBotonIniciaPartida = () => {
  tablero.cartas = barajarCartas(cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  const cartasElemento = document.querySelectorAll(".cartaClass") as NodeListOf<HTMLImageElement>;
  eventosListener(cartasElemento);
  mostrarPuntuacion();
  clickEnabled = true;
};
const handleBotonNuevaPartida = () => location.reload();

const botonNuevaPartida = document.getElementById("botonNuevaPartida") as HTMLButtonElement;
botonNuevaPartida.addEventListener("click", handleBotonNuevaPartida);

const botonIniciaPartida = document.getElementById("botonIniciaPartida") as HTMLButtonElement;
botonIniciaPartida.addEventListener("click", handleBotonIniciaPartida);

let clickEnabled = true;


const eventosListener = (cartasElemento: NodeListOf<HTMLImageElement>): void => {
  let primeraCartaVolteada = false;
  let indicePrimeraCarta: number | undefined;

  cartasElemento.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (clickEnabled) { // Check if clicks are enabled
        const indiceArray = Number(carta.dataset.indiceArray);

      if (sePuedeVoltearLaCarta(tablero, indiceArray)) {
        if (!primeraCartaVolteada) {
          //USUARIO HACE CLICK A LA PRIMERA CARTA
          carta.src = cartas[indiceArray].imagen;
          primeraCartaVolteada = true;
          indicePrimeraCarta = indiceArray;
          tablero.cartas[indiceArray].estaVuelta = true;
          tablero.estadoPartida = "UnaCartaLevantada";
          console.log("Una carta levantada");
        } else {
          //USUARIO HACE CLICK A LA SEGUNDA CARTA
          carta.src = cartas[indiceArray].imagen;
          tablero.cartas[indiceArray].estaVuelta = true;
          tablero.estadoPartida = "DosCartasLevantadas";
          console.log("Dos cartas levantadas");

          if (sonPareja(indicePrimeraCarta!, indiceArray, tablero)) {
            console.log("Pareja encontrada!");
            mensajePartidaCompletada();
            
          } else {
            console.log("Pareja no encontrada.");
            clickEnabled = false;
            setTimeout(() => {
              resetearImagenes(tablero.cartas, cartasElemento);
              numeroDeIntentos();
              mostrarPuntuacion();
              clickEnabled = true;
              console.log(intentos)
            }, 1250);
          }

          primeraCartaVolteada = false;
          indicePrimeraCarta = undefined;
        }
      }
    }
    });
  });
};



let intentos = 0;
const numeroDeIntentos = () => intentos++;

const numeroDeIntentosElement = document.getElementById("numeroDeIntentosId") as HTMLDivElement;

const mostrarPuntuacion = () => {
  if (numeroDeIntentosElement) {
    numeroDeIntentosElement.innerHTML = `Numero de intentos: ${intentos}`;
  }
}

const resetearImagenes = (cartas: Carta[], cartasElemento: NodeListOf<HTMLImageElement>): void => {
  cartas.forEach((carta, indice) => {
    if (carta.estaVuelta && !carta.encontrada) {
      (cartasElemento[indice] as HTMLImageElement).src = "blankimage.png";
      carta.estaVuelta = false;

    }
  });

};


const partidaCompletaElement = document.getElementById("partidaCompletaId");

const mensajePartidaCompletada = () => {
  if (esPartidaCompleta(tablero) && partidaCompletaElement) {
    partidaCompletaElement.innerHTML = `¡La partida ha terminado!`;
    console.log("Partida Completada!");
  };
};



let cards = Array.from(document.getElementsByClassName('cajaImg'));

cards.forEach((card) => {

  card.addEventListener('click', () => {
    card.classList.toggle('cajaFlip');
  });
});

