import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './model/dbCards.js'
// pass xuhfSlDEdmUXJtkF user tinderAdmin

const app = express()
const port = 5000

const connection_uri = `mongodb+srv://tinderAdmin:xuhfSlDEdmUXJtkF@cluster0.33vow.mongodb.net/tinderdb?retryWrites=true&w=majority`;
console.log(connection_uri)

app.use(express.json())
app.use(Cors());

mongoose.connect(connection_uri,{
useNewUrlParser: true,
// useCreateIndex: true,
useUnifiedTopology: true,
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post ('/tinder/cards',(req,res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err,data) => {
       if (err){
           res.status(500).send(err)
       } else{
           res.status(201).send(data)
       }
    })

})

app.get('/tinder/cards',(req,res) => {
    Cards.find((err,data) => {
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
     })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})