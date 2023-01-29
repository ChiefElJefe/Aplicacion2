const fetch = require('node-fetch')
const recurso = 'http://127.0.0.1:8080'

let cat = ''


let aleatorio = () => {
    return parseInt(Math.random() * 4)
}

let consthtml = document.getElementById('chatInterfaz')
let barra = document.getElementById('barralado')

let inicio = usuario => {

    cat += '<label style="color: ' + usuario.color + '">+' + usuario.usuario + '+</label><label>' + usuario.respuesta[aleatorio()] + '</label><br>'

    consthtml.innerHTML = cat

    fetch(recurso + '/img')
        .then(res => res.json())
        .then(json => cambioColor(json, usuario))

    if (consthtml) {
        consthtml.scrollTop = consthtml.scrollHeight
    }
}

let barralado = usuario => {
    let cat = ''
    cat = '<li class="list-group-header"><label>Chat de GPTO3</label></li>'
    for (let i = 0; i < usuario.length; i++) {
        cat += '<li class="list-group-item">'
            + '<img class="img-circle media-object pull-left" src="' + recurso + '/publico/' + usuario[i].img + '" width="64" height="64">'
            + '<div class="media-body">'
            + '<strong>' + usuario[i].usuario + '</strong>'
            + '<p><span class="icon icon-record"></span> Conectado</p>'
            + '</div>'
            + '</li>'
    }

    barra.innerHTML = cat
}

let cambioColor = (usuario, chatHablado) => {
    let cat = ''
    cat = '<li class="list-group-header"><label>Chat de GPTO3</label></li>'
    for (let i = 0; i < usuario.length; i++) {
        if (usuario[i].usuario != chatHablado.usuario) {
            cat += '<li class="list-group-item">'
                + '<img class="img-circle media-object pull-left" src="' + recurso + '/publico/' + usuario[i].img + '" width="64" height="64">'
                + '<div class="media-body">'
                + '<strong>' + usuario[i].usuario + '</strong>'
                + '<p><span class="icon icon-record"></span> Conectado</p>'
                + '</div>'
                + '</li>'
        } else {
            cat += '<li class="list-group-item" style="background-color: #06b9f0;">'
                + '<img class="img-circle media-object pull-left" src="' + recurso + '/publico/' + usuario[i].img + '" width="64" height="64">'
                + '<div class="media-body">'
                + '<strong>' + usuario[i].usuario + '</strong>'
                + '<p><span class="icon icon-record"></span> Conectado</p>'
                + '</div>'
                + '</li>'
        }

    }

    barra.innerHTML = cat
}

fetch(recurso + '/img')
    .then(res => res.json())
    .then(json => barralado(json))



document.getElementById('boton1').addEventListener('click', () => {
    cat += '<label style="color: gold">+Yo+</label><label>' + document.getElementById('mensaje').value + '</label><br>'
    fetch(recurso + '/usuarios')
        .then(res => res.json())
        .then(json => inicio(json))
})

document.getElementById('boton2').addEventListener('click', () => {
    let cadena = '<form>'
        + '<div class="form-group">'
        + '<labe>Introduce nuevo Usuario</label>'
        + '<input type="text" class="form-control" id="nUsuario" placeholder="Usuario">'
        + '<button type="button" class="btn btn-form btn-primary" id="boton3">Añadir</button>'
        + '</div>'
        + '</form>'
    consthtml.innerHTML = cadena
    document.getElementById('boton3').addEventListener('click', () => {

        let nuevo =
        {
            "usuario": document.getElementById('nUsuario').value,
            "img": "default.png",
            "color": "#C10819",
            "respuesta": [
                "No voy a utilizar Linux, me niego.",
                "Hola.",
                "Adios",
                "Mi hermano..."
            ]
        }

        fetch(recurso + '/annadir', {
            method: 'post',
            body: JSON.stringify(nuevo),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => barralado(json))
        consthtml.innerHTML = cat
    })

})

