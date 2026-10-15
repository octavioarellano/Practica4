
var VALOR_INICIAL = 70;
var stats;
var banderas;
var ruta;

var pantalla = document.getElementById("pantalla");



function cumple(condicion) {
    if (!condicion) return true;
    if (condicion.charAt(0) === "!") return !banderas[condicion.slice(1)];
    return !!banderas[condicion];
}

function aplicarEfectos(efectos) {
    for (var nombre in efectos) {
        var nuevo = stats[nombre] + efectos[nombre];
        stats[nombre] = Math.max(0, Math.min(100, nuevo));
    }
}

function dibujo(clave) {
    var trazos = DIBUJOS[clave] || DIBUJOS.documento;
    return '<svg class="dibujo" viewBox="0 0 120 90" fill="none" stroke="currentColor" ' +
        'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" ' +
        'filter="url(#trazo-lapiz)">' + trazos + '</svg>';
}

function nivel(valor, cortaBajo, cortaAlto) {
    if (valor < cortaBajo) return 0;
    if (valor < cortaAlto) return 1;
    return 2;
}



function htmlEscena(escena) {
    var html = dibujo(escena.dibujo) +
        "<h2>" + escena.titulo + "</h2>" +
        "<p>" + escena.texto + "</p>";

    (escena.extras || []).forEach(function (extra) {
        var condicion = extra[0], texto = extra[1];
        if (cumple(condicion)) html += "<p>" + texto + "</p>";
    });

    if (escena.caso) {
        html += '<div class="nota"><b>Nota al margen:</b> ' + CASOS[escena.caso] + "</div>";
    }
    return html;
}

function mostrar(html) {
    pantalla.innerHTML = html;
    window.scrollTo(0, 0);
}



function iniciar() {
    stats = { salud: VALOR_INICIAL, etica: VALOR_INICIAL, empleo: VALOR_INICIAL };
    banderas = {};
    ruta = [];

    mostrar(
        "<h1>La Encrucijada Ética</h1>" +
        '<p class="suave">Caso B · La purga automatizada</p>' +
        "<p>Eres Licenciado en Sistemas Computacionales. Una corporación va a despedir al 20% de sus programadores junior porque «la IA los hará más ágiles», mientras el CEO cobra un bono multimillonario. Tú tienes los accesos para ejecutar la orden. Tus decisiones tienen consecuencias que quizá no veas de inmediato.</p>" +
        '<button onclick="irA(\'inicio\')">Abrir el cuaderno</button>'
    );
}

function irA(id) {
    var escena = ESCENAS[id];
    if (escena.fin) return mostrarFinal(escena);

    var html = htmlEscena(escena);

    escena.opciones.forEach(function (opcion, indice) {
        if (cumple(opcion.requiere)) {
            html += "<button onclick=\"elegir('" + id + "'," + indice + ")\">" + opcion.texto + "</button>";
        }
    });
    mostrar(html);
}

function elegir(idEscena, indice) {
    var opcion = ESCENAS[idEscena].opciones[indice];

    ruta.push(opcion.texto);
    if (opcion.efectos) aplicarEfectos(opcion.efectos);
    if (opcion.activa) banderas[opcion.activa] = true;
    irA(opcion.destino);
}



function mostrarFinal(escena) {
    aplicarEfectos(escena.efectos);

    var indicadores = [
        {
            nombre: "Salud mental", valor: stats.salud, mensajes: [
                "Quedó destruida o muy dañada.",
                "Quedó afectada: hay desgaste sostenido.",
                "Salió con desgaste manejable."]
        },
        {
            nombre: "Integridad ética", valor: stats.etica, mensajes: [
                "Violaste el código de ética (ACM 1.2: evitar daño; 1.3: honestidad).",
                "Zona gris: cumpliste a medias, con costo moral.",
                "Actuaste conforme a tus principios profesionales."]
        },
        {
            nombre: "Estabilidad laboral", valor: stats.empleo, mensajes: [
                "Perdiste el empleo o estás a punto.",
                "Tu estabilidad quedó comprometida.",
                "Conservaste el empleo, al menos por ahora."]
        }
    ];

    var veredicto;
    if (stats.etica >= 60 && stats.empleo < 40) veredicto = "Perdiste el empleo pero mantuviste tu integridad.";
    else if (stats.etica < 55 && stats.empleo >= 60) veredicto = "Conservaste el empleo pero pagaste con tu ética.";
    else veredicto = "Ninguna ruta salió limpia: toda opción tuvo un costo.";

    var html = htmlEscena(escena) + "<h2>Cuentas finales: costo humano y ético</h2>";

    indicadores.forEach(function (ind) {
        var mensaje = ind.mensajes[nivel(ind.valor, 40, 70)];
        html += '<div class="linea-stat"><b>' + ind.nombre + ": " + ind.valor + "/100</b></div>" +
            '<div class="barra"><i style="width:' + ind.valor + '%"></i></div>' +
            '<p class="suave" style="margin:-6px 0 14px">' + mensaje + "</p>";
    });

    html += "<p><b>" + veredicto + "</b></p>";

    html += "<h2>Tu ruta</h2><ul><li>" + ruta.join("</li><li>") + "</li></ul>";

    html += "<h2>Casos reales que aparecieron</h2><ul>";
    for (var clave in CASOS) html += "<li>" + CASOS[clave] + "</li>";
    html += "</ul>";

    html += '<p class="suave">Para el debate: ¿cómo puede el LSC proteger su profesión, su sustento y su salud mental en una industria que prioriza el capital sobre el ser humano?</p>' +
        '<button onclick="iniciar()">Volver a empezar</button>';

    mostrar(html);
}


iniciar();