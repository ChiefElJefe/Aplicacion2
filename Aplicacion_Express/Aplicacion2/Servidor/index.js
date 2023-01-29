const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
let archivo = fs.readFileSync('./usuarios.json')
let usuarios = JSON.parse(archivo)

let app = express()

let aleatorio = () => {
    return parseInt(Math.random() * usuarios.length)
}

app.use('/publico', express.static(__dirname + '/publico'))
app.use(bodyParser.json())

app.get('/usuarios', (req, res) => {
    let archivo = fs.readFileSync('./usuarios.json')
    usuarios = JSON.parse(archivo)
    res.send(usuarios[aleatorio()])
})

app.get('/img', (req, res) => {
    let archivo = fs.readFileSync('./usuarios.json')
    usuarios = JSON.parse(archivo)
    res.send(usuarios)
})

app.post('/annadir', (req, res) => {
    try {
        let nuevo = req.body
        let archivo = fs.readFileSync('./usuarios.json')
        usuarios = JSON.parse(archivo)
        usuarios.push(nuevo)
        fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios))
        res.send(usuarios)
    } catch (err) {
        console.log(err)
    }
})

app.listen(8080)