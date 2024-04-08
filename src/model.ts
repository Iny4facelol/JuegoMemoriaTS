interface InfoCarta {
    idFoto: number;
    imagen: string;
};

export interface Carta {
    idFoto: number;
    imagen: string;
    estaVuelta: boolean;
    encontrada: boolean;
}


export const infoCartas: InfoCarta[] = [
    {
        idFoto: 1,
        imagen: "1.png",
    },
    {
        idFoto: 2,
        imagen: "2.png",
    },
    {
        idFoto: 3,
        imagen: "3.png",
    },
    {
        idFoto: 4,
        imagen: "4.png",
    },
    {
        idFoto: 5,
        imagen: "5.png",
    },
    {
        idFoto: 6,
        imagen: "6.png",
    },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVuelta: false,
    encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
    let cartas: Carta[] = [];

    // Iterate over the array of infoCartas
    for (const infoCarta of infoCartas) {
        // Create two cards using the `crearCartaInicial` function
        const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
        const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);

        // Set `estaVuelta` and `encontrada` properties of the first card
        carta1.estaVuelta = false;
        carta1.encontrada = false;

        // Set `estaVuelta` and `encontrada` properties of the second card
        carta2.estaVuelta = false;
        carta2.encontrada = false;

        // Push the cards into the `cartas` array
        cartas.push(carta1);
        cartas.push(carta2); 
    }

    // Return the final array of cards
    return cartas;
};


export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);
 
type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();




// const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
//     return infoCartas.flatMap((infoCarta) => {
//       const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
//       const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
//       carta1.estaVuelta = false;
//       carta1.encontrada = false;
//       carta2.estaVuelta = false;
//       carta2.encontrada = false;
//       return [carta1, carta2];
//     });
//   };