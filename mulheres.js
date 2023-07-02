const express = require("express")
const router = express.Router()
const cors = require('cors')

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')
const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333


async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (error) {
        console.log(error)
    }
    
 }


async function criaMulher(request, response){
    const novaMulher = new Mulher({
       nome: request.body.nome,
       imagem: request.body.imagem,
       minibio: request.body.minibio,
       citacao: request.body.citacao
   })

   try {
        const mulhercriada = await novaMulher.save()
        response.status(201).json(mulhercriada)
   } catch (error) {
        console.log(error)
   }

}

async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.minibio){
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBanco = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBanco)

    } catch (error) {
        console.log(error)
    }
}

async function deletaMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ menssagem: 'Mulher Deletada com Sucesso!'})
    } catch (error) {
        console.log(error)
    }
}

function mostraporta (){
    console.log("Servidor criado e rodando na porta ", porta);

}

app.use(router.get('/mulheres',mostraMulheres)) 
app.use(router.post('/mulheres', criaMulher)) //para poder receber dados via form
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))

app.listen(porta, mostraporta);