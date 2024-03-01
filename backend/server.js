import  express, { response }  from "express"
const app = express()
const port=3000



app.use(express.json());

app.get('/todos', (req, res) => {
    res.json(todos);
  });
  

app.post('/todos', (req,res) =>{
    const body = request.body

    todos.push({
        title: body.title,
        etat:body.etat
    })

    response.json()
})


app.listen(port, () =>{
    console.log("L'app est en écoute sur le port 3000 du serveur local")
})

