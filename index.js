const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const port =process.env.PORT || 5000
const cors = require('cors')
const ObjectId=require(`mongodb`).ObjectId

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.amixw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("geniucs-car");
      const user = database.collection("user");
      


 
    //    post api  
      app.post(`/users`,async(req,res)=>{
          const newuser=req.body
        const result=await user.insertOne(newuser)
          res.json(result)
        })

   app.get(`/users/:id`,async(req,res)=>{
       const id=req.params.id;
       const quary={_id:ObjectId(id)}
       const result=await user.findOne(quary)
       res.json(result)
   })




   //   get api
   app.get(`/users`,async(req,res)=>{
    const cursor=user.find({})
    const result=await cursor.toArray()
    res.send(result)
})


// delete api

app.delete(`/users/:id`,async(req,res)=>{
    const id=req.params.id;
    const quary={_id:ObjectId(id)}
    const result=await user.deleteOne(quary)
    res.send(result)
    console.log(result);
})





    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);










app.get('/', (req, res) => {
    res.send('Hello nirub khan ,welcome to geniucs car machanice')
  })


app.listen(port, () => {
    console.log(`genius car server start hear`,port)
  })