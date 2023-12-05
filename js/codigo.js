var palabra_seleccionada = '';
var coincidencias = [];
var intentos = 6;
var fallos = 0;

function seleccionarPalabra(palabras) {
    var total_palabras = palabras.length - 1;
    var rand = (Math.random() * total_palabras).toFixed(0);
    palabra_seleccionada = palabras[rand].toLowerCase();
    console.log(palabra_seleccionada);
    pintarPalabra(palabra_seleccionada);
}

function chequear(event) {
    comprobarLetra(event.target.textContent);
}

function pintarPalabra(palabra) {
    var str = '';
    var letras = palabra.split('');

    letras.forEach((l, i) => {
        if (coincidencias.includes(l)) {
            str += `<div class="oculto">${l}</div>`;
        } else {
            coincidencias[i] = "_";
            str += `<div class="oculto">?</div>`;
        }
    });

    document.getElementById("word").innerHTML = str;
}

function abc() {
    var a = 97;
    var z = 123;
    var letras = document.getElementById("letras");

    for (var l = a; l < z; l++) {
        const char = String.fromCharCode(l);

        var letra = document.createElement('div');
        letra.classList.add('abc', 'bg-secondary', 'text-primary', 'manito');
        letra.setAttribute('id', 'letra-' + char);
        letra.textContent = char;
        letra.addEventListener('click', chequear);

        letras.appendChild(letra);
    }
}

function comprobarLetra(char) {
    var letra = document.getElementById('letra-' + char);

    if (palabra_seleccionada.indexOf(char) != -1) {
        for (var i = 0; i < palabra_seleccionada.length; i++) {
            if (palabra_seleccionada[i] == char) coincidencias[i] = char;
        }
        pintarPalabra(palabra_seleccionada);

        letra.classList.remove("bg-secondary", "text-primary");
        letra.classList.add("bg-primary");
    } else {
        intentos--;
        fallos++;
        letra.classList.add("bg-error", 'text-light');
        document.getElementById("palo").src = `img/${fallos}.jpg`;
    }
    letra.classList.remove("manito");
    letra.removeEventListener('click', chequear);

    comprobarJuego();
}

function comprobarJuego() {
    if (intentos == 0) {
        alert('Lo siento, haz perdido, presione el botón volver a iniciar');
        window.location.reload();
    } else if (coincidencias.indexOf("_") == -1) {
        document.getElementById("palo").src = `img/win.gif`;
        
        window.location.reload();
        alert('Haz ganado, presiona el botón para volver a iniciar');
    }
}

function start() {
    seleccionarPalabra(WORDS);
    abc();
}

