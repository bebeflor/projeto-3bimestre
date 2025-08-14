import express from 'express'

const app = express()
const PORT = 3000

let usuarios = [];
let contador = 1;

app.use(express.json())

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({message: "API Online"})
})

//ROTA GET LISTAR TODOS OS ITENS
app.get("/usuarios") , (req,res) => {
  res.json(usuarios)
}

//ROTA  POST CRIAR NOVO USUARIO
app.post("/usuarios", (req,res) => {
   const { nome} = req.body;

   const novoUsuario = {
    id: contador ++,
    nome
   };

   usuarios.push(novoUsuario);
   res.status(201).json(novoUsuario);

})
//ROTA PUT ATUALIZA USUARIO POR ID
app.put("/usuarios/:id", (req, res) =>{
  const id = parseInt(req.params.id)
  const {nome} = req.body

  const usuaio = usuarios.find((i) => i.id === id );

  if (!usuario){
    return res.status(404). json({ erro: "Usuario não encontrado"});
  }
  usuario.nome = nome;
  res.json(usuario);
});

  
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})