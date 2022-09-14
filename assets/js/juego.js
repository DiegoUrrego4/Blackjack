// Función anonima auto invocada
const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];

// Referencias HTML:
    const btnPedir = document.querySelector('#btnPedir'), btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'), puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach((element) => element.innerText = 0);
        divCartasJugadores.forEach((element) => element.innerHTML = '');
        // Habilitación botones
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }

// ? Esta función crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length === 0) throw 'No hay cartas en el Deck';
        return deck.pop();
    };


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    };

    // turno: 0 -> Primer jugador y el último la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCartaNueva = document.createElement('img');
        imgCartaNueva.src = `./assets/cartas/${carta}.png`;
        imgCartaNueva.classList.add('carta');
        divCartasJugadores[turno].append(imgCartaNueva);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosMinimos > 21) {
                alert('Perdiste! Mejor suerte para la próxima mi rey. 😁😁 att: La PC 😏');
            } else if (puntosComputadora === puntosMinimos) {
                alert('Empate! 😱 estuvo bastante reñido.');
            } else if (puntosComputadora > 21) {
                alert('Ganaste! Muy bien hecho. 👏👏');
            } else {
                alert('Perdiste! Mejor suerte para la próxima mi rey. 😁😁 att: La PC 😏');
            }
        }, 100)
    }

// Turno de la computadora:
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) break;

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        determinarGanador();

    };

// Eventos:
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0)

        if (puntosJugador > 21) {
            console.warn('Lo siento, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    };

})();

