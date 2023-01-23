const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

let app = express()

let aleatorio =()=>{
    return parseInt(Math.random()*4)
}

app.use('/publico', express.static(__dirname + '/publico'))
app.use(bodyParser.json())

app.get('/usuarios', (req, res) => {
    let archivo = fs.readFileSync('./usuarios.json')
    let usuarios = JSON.parse(archivo)
    res.send(usuarios[aleatorio()])
})

/* app.post('/annadir', (req, res) => {
    try {
        let nuevo = req.body
        let archivo = fs.readFileSync('./libros.json')
        let libros = JSON.parse(archivo)
        libros.push(nuevo)
        fs.writeFileSync('./libros.json', JSON.stringify(libros))
        res.send(libros)
    } catch (err) {
        console.log(err)
    }
}) */

app.listen(8080)