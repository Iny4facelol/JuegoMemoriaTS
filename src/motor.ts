
import { Carta } from "./model";
import { Tablero } from "./model";


export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
      }
      return cartas;
};


export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  // Check if the game has not started or if the game is in the "CeroCartasLevantadas" state
  if (tablero.estadoPartida === 'PartidaNoIniciada' || tablero.estadoPartida === 'CeroCartasLevantadas') {
    return true;
  }

  if (tablero.cartas[indice].estaVuelta) {
    return false;
  }

  if (tablero.indiceCartaVolteadaB !== undefined) {
    return false;
  }

  return true;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (indice >= 0 && indice < tablero.cartas.length) {
    tablero.cartas[indice].estaVuelta = true;
  } else {
    console.error("Index is out of bounds of the tablero.cartas array");
  }
};


export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  console.log(tablero.cartas[indiceA])
  console.log(`Comparing cards with indices ${indiceA} and ${indiceB}`);
  if (indiceA >= 0 && indiceA < tablero.cartas.length && indiceB >= 0 && indiceB < tablero.cartas.length) {
    if (tablero.cartas[indiceA].estaVuelta && tablero.cartas[indiceB].estaVuelta) {
      if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
        console.log("funcion sonPareja activada");
        parejaEncontrada(tablero, indiceA, indiceB);
        return true;
      } else {
        parejaNoEncontrada(tablero, indiceA, indiceB);
      }
    }
  } else {
    console.error("Index is out of bounds of the tablero.cartas array");
  }

  return false;
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  if (tablero.cartas[indiceA] && tablero.cartas[indiceB]) {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    


    if (esPartidaCompleta(tablero)) {
      tablero.estadoPartida = "PartidaCompleta";
    }
  } else {
    console.error("Undefined value found in the tablero.cartas array");
  }
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  if (tablero.cartas[indiceA] && tablero.cartas[indiceB]) {
    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceB].encontrada = false;

    if (tablero.cartas[indiceA].idFoto !== tablero.cartas[indiceB].idFoto) {
      tablero.indiceCartaVolteadaA = undefined;
      tablero.indiceCartaVolteadaB = undefined;
      console.log("Pareja No Encontrada");
    } else {
      console.log("Las cartas son iguales, pero ya estaban encontradas.");
    }
  } else {
    console.error("Undefined value found in the tablero.cartas array");
  }
};

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  if(tablero.cartas.every((carta) => carta.encontrada)) {
    tablero.estadoPartida === "PartidaCompleta";
    return true;
  };
  return false;
}
/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  // Reset 
  tablero.cartas.forEach(carta => {
    carta.encontrada = false;
  });

  // Reset 
  tablero.estadoPartida = "PartidaNoIniciada";

  // Reset 
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};