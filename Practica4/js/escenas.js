
var ESCENAS = {


    inicio: {
        titulo: "Lunes, 8:40 am",
        dibujo: "compu",
        texto: "Eres LSC en NovaCorp, una Big Tech con ganancias récord. Tu director te escribe: «Hoy necesito el script que desactive las cuentas del 20% de los junior. Su trabajo pasa al asistente de IA. Confidencial; RH avisa el viernes». En la intranet, un titular: el CEO recibirá un bono multimillonario por «optimizar costos».",
        opciones: [
            { texto: "Abrir la lista de nombres", destino: "lista" }
        ]
    },

    lista: {
        titulo: "La lista",
        dibujo: "documento",
        texto: "Son 48 nombres. El tercero es Marta, a quien capacitaste hace un año; acaba de firmar el contrato de su departamento. Tienes hasta el viernes.",
        caso: "jr",
        opciones: [
            {
                texto: "Avisarle a Marta en secreto", destino: "decision",
                efectos: { etica: 10, empleo: -5 }, activa: "aviso"
            },
            {
                texto: "Pasar la noche investigando si la IA de verdad puede reemplazarlos", destino: "decision",
                efectos: { etica: 5 }, activa: "investigo"
            },
            { texto: "No pensarlo más y decidir ya", destino: "decision" }
        ]
    },

    decision: {
        titulo: "Miércoles, de madrugada",
        dibujo: "puerta",
        texto: "No has dormido bien.",
        extras: [
            ["aviso", "Marta ya sabe. Si el director se entera de que hubo una fuga, tú eres el primer sospechoso."],
            ["investigo", "Lo que leíste: el asistente falla en código crítico y existe el «AI washing», despedir por razones financieras con la IA de pretexto. Tienes argumentos."]
        ],
        caso: "wash",
        opciones: [
            { texto: "Acatar: ejecutar el script", destino: "acatar_1", efectos: { etica: -10, empleo: 5 } },
            { texto: "Sabotear el script", destino: "sabotaje_1", efectos: { etica: -5 } },
            { texto: "Negarme y confrontar a RH", destino: "rh", efectos: { etica: 10, empleo: -8 } },
            {
                texto: "Pedir la orden por escrito antes de mover un dedo", destino: "rh",
                efectos: { etica: 5 }, activa: "escrito"
            },
            {
                texto: "Cuestionar al director con los datos que investigaste", destino: "rh",
                efectos: { etica: 10, empleo: -10 }, activa: "datos", requiere: "investigo"
            }
        ]
    },


    acatar_1: {
        titulo: "Viernes, 9:00 am",
        dibujo: "compu",
        texto: "Corres el script. Se apagan 48 cuentas. En el chat del equipo nadie escribe. Te llega un mensaje.",
        extras: [
            ["aviso", "Es de Marta: «Gracias por avisarme. Ya mandé currículums». Te duele más que un reclamo. Y el director pregunta quién filtró."],
            ["!aviso", "Es de Marta: «¿Lo sabías desde el lunes?». No contestas."]
        ],
        caso: "sf",
        opciones: [
            { texto: "Seguir como si nada", destino: "acatar_2", efectos: { salud: -5 } },
            { texto: "Decirle al director que fue un error", destino: "acatar_2", efectos: { etica: 5, empleo: -8 } }
        ]
    },

    acatar_2: {
        titulo: "Tres semanas después",
        dibujo: "compu",
        texto: "Sin los junior, tu equipo usa la IA para todo lo básico y tú revisas lo que genera. Un bug del código generado tira un servicio en producción un viernes a las 11 pm. Te toca arreglarlo, otra vez.",
        caso: "for",
        opciones: [
            {
                texto: "Aguantar: noches y fines de semana", destino: "acatar_3",
                efectos: { salud: -20, empleo: 5 }, activa: "crunch"
            },
            {
                texto: "Poner un límite: «así no es sostenible»", destino: "acatar_3",
                efectos: { salud: 5, etica: 5, empleo: -10 }
            }
        ]
    },

    acatar_3: {
        titulo: "La segunda ronda",
        dibujo: "documento",
        texto: "Corre el rumor de otro recorte. El director te pide un manual para que «cualquiera pueda mantener» lo que haces.",
        extras: [
            ["crunch", "Llevas semanas durmiendo mal y cuesta concentrarte; ya cometiste un par de errores tontos."]
        ],
        caso: "blk",
        opciones: [
            {
                texto: "Entregar el manual completo y confiar",
                destino: "final_complice", efectos: { etica: -10 }
            },
            {
                texto: "Guardar evidencia de las órdenes y buscar otro empleo",
                destino: "final_evidencia", efectos: { etica: 10, empleo: -5 }
            },
            {
                texto: "Negarte a entregarlo sin garantías por escrito",
                destino: "final_sin_manual", efectos: { etica: 10, empleo: -15 }
            }
        ]
    },


    sabotaje_1: {
        titulo: "Sabotaje",
        dibujo: "compu",
        texto: "Metes un error sutil: el script se detiene a la mitad y deja las cuentas inconsistentes. Ganas unos días. Pero el commit lleva tu usuario.",
        extras: [
            ["aviso", "Además, alguien le dijo a Marta, y el director ya busca a quien filtró."]
        ],
        opciones: [
            { texto: "Esperar a ver qué pasa", destino: "sabotaje_2", efectos: { salud: -10 } },
            { texto: "Confesar antes de que te descubran", destino: "sabotaje_3", efectos: { etica: 5, empleo: -5 } }
        ]
    },

    sabotaje_2: {
        titulo: "El rastro",
        dibujo: "puerta",
        texto: "Seguridad revisa los logs. Te citan con RH y un abogado de la empresa. El director no te mira a los ojos.",
        opciones: [
            { texto: "Negarlo todo", destino: "final_descubierto" },
            { texto: "Admitir y explicar tus razones", destino: "sabotaje_3", efectos: { etica: 5, empleo: -10 } }
        ]
    },

    sabotaje_3: {
        titulo: "Frente al abogado",
        dibujo: "grupo",
        texto: "Explicas tus razones. El abogado habla de «daño a sistemas» y «responsabilidad civil».",
        opciones: [
            { texto: "Aceptar la salida sin más", destino: "final_despido_sabotaje" },
            {
                texto: "Pedir un representante o asesoría laboral", destino: "final_salida_negociada",
                efectos: { etica: 5, empleo: -5 }
            }
        ]
    },


    rh: {
        titulo: "Sala de Recursos Humanos",
        dibujo: "grupo",
        texto: "RH tiene un guion pulido: «es una reorganización estratégica para ser más ágiles». Tu puesto no corre riesgo «si colaboras». Te piden firmar un acuerdo de confidencialidad.",
        extras: [
            ["datos", "Les citas el «AI washing». El director se pone nervioso y cambia de tema."],
            ["escrito", "Al pedir la orden por escrito, RH se pone rígida: «aquí nada consta por escrito»."]
        ],
        caso: "wash",
        opciones: [
            { texto: "No firmar el acuerdo", destino: "represalias", efectos: { etica: 5, empleo: -8 } },
            { texto: "Firmar para ganar tiempo", destino: "represalias", efectos: { etica: -8, empleo: 5 } }
        ]
    },

    represalias: {
        titulo: "Represalias suaves",
        dibujo: "puerta",
        texto: "A la semana te quitan acceso a repositorios clave y te mueven a un «proyecto especial». Nadie lo llama castigo.",
        extras: [
            ["aviso", "Marta te escribe: ya no la verás en la oficina, pero quiere ayudar."]
        ],
        opciones: [
            { texto: "Organizar una carta colectiva", destino: "cafe", efectos: { etica: 10, salud: -8, empleo: -5 } },
            { texto: "Filtrar el caso a la prensa", destino: "final_filtracion" },
            { texto: "Renunciar con una carta pública", destino: "final_renuncia" },
            { texto: "Aceptar el traslado y callar", destino: "final_complice", efectos: { etica: -15, salud: -10 } }
        ]
    },

    cafe: {
        titulo: "El café",
        dibujo: "grupo",
        texto: "Citas a tus compañeros en una cafetería. De quince, llegan nueve. Seis dicen que no pueden arriesgarse.",
        extras: [
            ["aviso", "Marta llega con tres de los despedidos."]
        ],
        caso: "blk",
        opciones: [
            {
                texto: "Buscar asesoría laboral y sumar a los despedidos", destino: "final_colectivo",
                efectos: { etica: 10, salud: 5 }, activa: "asesoria"
            },
            {
                texto: "Enviar la carta ya, sin más preparación", destino: "final_colectivo",
                efectos: { etica: 5, empleo: -8 }
            }
        ]
    },



    final_complice: {
        fin: true, dibujo: "documento",
        titulo: "El cómplice silencioso",
        texto: "Conservas el empleo, por ahora. Cargas con la culpa y con el miedo a la próxima ronda. Dejaste que un recorte financiero pasara por «innovación».",
        efectos: { salud: -15, etica: -15 }
    },

    final_evidencia: {
        fin: true, dibujo: "documento",
        titulo: "Con evidencia bajo el brazo",
        texto: "Cumpliste, pero guardaste mensajes, fechas y órdenes. Eso no te absuelve del todo, aunque te protege legalmente y te sirve si decides denunciar o buscar asesoría.",
        efectos: { etica: 8 }
    },

    final_sin_manual: {
        fin: true, dibujo: "documento",
        titulo: "Sin manual y sin garantías",
        texto: "Te niegas a convertirte en el manual de tu propio reemplazo. Te marcan como «difícil», pero tu trabajo vale más cuando no lo regalas.",
        efectos: { empleo: -10, etica: 8 }
    },

    final_descubierto: {
        fin: true, dibujo: "documento",
        titulo: "Descubierto",
        texto: "Los logs contradicen tu versión. Te despiden con causa y la empresa ya tiene argumento para pintar a los despedidos como «ineficientes».",
        efectos: { salud: -10, etica: -20, empleo: -20 }
    },

    final_despido_sabotaje: {
        fin: true, dibujo: "documento",
        titulo: "Despido por sabotaje",
        texto: "Mantienes coherencia moral, pero pierdes empleo y referencias. El sabotaje individual es un delito informático potencial y no cambió el problema de fondo.",
        efectos: { empleo: -20, etica: 5 }
    },

    final_salida_negociada: {
        fin: true, dibujo: "documento",
        titulo: "Salida negociada",
        texto: "Con asesoría laboral negocias una salida menos destructiva, aunque pierdes el trabajo. Entiendes que sabotear sin respaldo fue la peor forma de protestar.",
        efectos: { etica: 8, empleo: -5 }
    },

    final_colectivo: {
        fin: true, dibujo: "grupo",
        titulo: "Acción colectiva",
        texto: "La empresa no cancela los despidos, pero mejora las liquidaciones y ya no estás solo. Hay desgaste y tensión.",
        extras: [
            ["asesoria", "El acompañamiento legal mejora la negociación: tomas como referencia las condiciones que Block ofreció a sus despedidos."]
        ],
        efectos: { etica: 15, salud: 5 }
    },

    final_filtracion: {
        fin: true, dibujo: "documento",
        titulo: "La filtración",
        texto: "La nota se vuelve viral y hay presión pública sobre el CEO. La empresa te despide por violar la confidencialidad. Mucho riesgo personal, y nada garantiza que algo cambie.",
        efectos: { etica: 12, empleo: -25, salud: -10 }
    },

    final_renuncia: {
        fin: true, dibujo: "puerta",
        titulo: "Renuncia con principios",
        texto: "Duermes mejor, pero renunciaste sin otro empleo en un mercado donde los puestos de entrada cayeron fuerte. Cada mes el fondo de emergencia se acorta.",
        efectos: { etica: 8, empleo: -25, salud: 8 }
    }
};