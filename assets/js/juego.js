/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearths (Corazones)
 * 2S = Two of Swords (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML:
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

// ? Esta función crea una nueva baraja
const crearDeck = () => {
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

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
};

const pedirCarta = () => {
    if (deck.length === 0) throw 'No hay cartas en el Deck';
    const carta = deck.pop();
    return carta;
};

crearDeck();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

// Turno de la computadora:
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCartaNueva = document.createElement('img');
        imgCartaNueva.src = `./assets/cartas/${carta}.png`;
        imgCartaNueva.className = 'carta';
        divCartasComputadora.append(imgCartaNueva)

        if (puntosMinimos > 21) break;

    } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

    setTimeout(() => {
        if (puntosMinimos > 21) {
            alert('Perdiste! Mejor suerte para la próxima mi rey. 😁😁 att: La PC 😏');
        } else if (puntosComputadora === puntosMinimos) {
            alert('Empate! 😱 estuvo bastante reñido.')
        } else if (puntosComputadora > 21) {
            alert('Ganaste! Muy bien hecho. 👏👏')
        } else {
            alert('Perdiste! Mejor suerte para la próxima mi rey. 😁😁 att: La PC 😏');
        }
    }, 100)
};


// Eventos:
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCartaNueva = document.createElement('img');
    imgCartaNueva.src = `./assets/cartas/${carta}.png`;
    imgCartaNueva.className = 'carta';
    divCartasJugador.append(imgCartaNueva);

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
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    console.clear();
    // Creación de nueva baraja
    deck= [];
    crearDeck();
    // Reinicio de puntos
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    // Eliminación de cartas
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    // Habilitación botones
    btnDetener.disabled = false;
    btnPedir.disabled = false;

})