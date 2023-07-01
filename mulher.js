const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome:'Simara conceição',
        imagem:'https://github.com/simaraconceicao.png',
        minibio: 'Desencolvedora e instrutora'
    })
}

function mostraporta (){
    console.log("Servidor criado e rodando na porta ", porta);

}

app.use(router.get('/mulher',mostraMulher))
app.listen(porta, mostraporta);