
import express from "express";
import { v4 } from "uuid";   /*Obs */
import cors from "cors";

const port = 3001;
const app = express () ;
app.use(express.json());
app.use(cors()) 

/* app.use(cors()) - Este exemplo qualquer pessoa pode ter acesso, para uma aplicaçao particular
 é importante os sites ou enderenços que terá acesso a essa API  */

/*
- query params => meusite.com/users?nome=rodolfo&age=28 // FILTROS
- Route params => /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALO ESPECÍFICO
- Request Body => { "name" "Rodolfo", "age"}

- GET             => Buscar Informaçao no ack-end
- POST            => Criar informaçao no back-end
- POST / PATCH    => Alterar/Atualizar informaçao no back-end
- DELETE          => Deletar informaçao no back-end

- Middlewares => INTERCEPTOR => Tem o poder de parar ou alterar dados da requisiçao. 
*/

const users = []
const checkUserId = (request, response, next) => {
  const {id} = request.params

  const index = users.findIndex( user => user.id === id )

  if (index < 0){
    return response.status(404).json({message: "User not found"})
  }
request.userIndex = index
request.userId = id
next ()

}


app.get('/users', (request, response) => {
 

  return response.json (users) 

})

app.post ('/users', (request, response) => {
    const { name, age} = request.body
   
  
  const user = { id: uuid.v4(), name: name, age: age }
  
users.push(user)

  return response.status(201).json(user) 
  
  })
  

  app.put('/users/:id',checkUserId, (request, response)  => {
   
    const {name, age} = request.body
const index = request.userIndex
const id = request.userId
    const updatedUser = {id, name, age}

 
    
    users [index] = updatedUser

    return response.json (updatedUser) 
  
  })

  app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

users.splice(index,1)

    return response.status(204).json() 
  
  })
  


app.listen(port, () => {
    console.log ('Server started on port 3001')
})
