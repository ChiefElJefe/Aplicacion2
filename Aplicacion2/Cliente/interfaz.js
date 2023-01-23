const fetch = require('node-fetch')
const recurso = 'http://127.0.0.1:8080'

let cat = ''


let aleatorio = () => {
    return parseInt(Math.random() * 4)
}

let consthtml = document.getElementById('chatInterfaz')

let inicio = usuario => {

    cat += '<label style="color: ' + usuario.color + '">+' + usuario.usuario + '+</label><label>' + usuario.respuesta[aleatorio()] + '</label><br>'

    consthtml.innerHTML = cat
}

fetch(recurso + '/libros')
    .then(res => res.json())
    .then(json => inicio(json))

document.getElementById('boton1').addEventListener('click', () => {
    fetch(recurso + '/usuarios')
    .then(res => res.json())
    .then(json => inicio(json))
})
