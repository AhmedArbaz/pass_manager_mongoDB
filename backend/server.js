import express from "express"
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from "body-parser";
import cors from 'cors'


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express()
const port = 3000
app.use(cors())

//Database Name
const dbName = 'passop';
app.use(bodyParser.json())

client.connect();


//Get all the prasswords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})


//Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
  res.send({success:true,result:findResult})
})

//Delete a password by ID
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
  res.send({success:true,result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})