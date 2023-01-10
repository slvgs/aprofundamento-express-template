import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get('/accounts/:id', (req: Request, res: Response) =>{
    const id = req.params.id // aqui não precisa fazer uma tipagem forçada com "as string" igual no query
    // const q = req.query.q as string //aqui é necessário forçar a string 
    const result = accounts.find((ac) => {
        return ac.id === id

        
        
    })

    res.status(200).send(result)

})

app.delete('/accounts/:id', (req: Request, res: Response) =>{
    const id = req.params.id // aqui não precisa fazer uma tipagem forçada com "as string" igual no query
   
    //splice: altera o conteudo de uma lista, adiciona novos elementos e adiciona antigos
    //findIndex 

    const indexToRemove = accounts.findIndex((ac) =>  ac.id === id)

    if (indexToRemove >= 0){
        accounts.splice(indexToRemove, 1)
        //               alvo,        quantos itens serão removidos a partir do alvo
    }
        
        
   

    res.status(200).send("item deletado com sucesso ")

})

app.put("/accounts/:id", (req: Request, res: Response)=> {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const accountToEdit = accounts.find((ac) =>  ac.id === id)

    if (accountToEdit){
        // accountToEdit.id = (newId === undefined ? accountToEdit.id : newId)
        accountToEdit.id = newId || accountToEdit.id
        accountToEdit.ownerName = newOwnerName || accountToEdit.ownerName
        accountToEdit.type = newType || accountToEdit.type
       

        accountToEdit.balance = isNaN(newBalance) ? accountToEdit.balance : newBalance

        //isNaN serve para saber se o dado que estamos tratando é um number ou nao 


    }

    res.status(200).send('Atualização realizada com sucesso')
})




//filter ->  sempre retorna um array com resultados
//find ->  retorna o item ou  null/undefined


// ['a', 'b', 'c']

//find => 'a'
//findIndex => 0
//slipe(posição alvo, quantos itens serão removidos)

//procuro a posição do array no findeIndex e depois removo com splice 