import { MongoClient } from 'mongodb';
import express from 'express';
import 'dotenv/config';

console.log('hello world');

const client = new MongoClient(typeof process.env.DATABASE_URL === 'undefined' ? '' : process.env.DATABASE_URL);
client.connect(() => console.log('connected to database'));
const db = client.db();

const app = express();

db.collection('frog').insertOne({
  name: 'joey',
  smol: false,
  habitat: ['rainforest', 'his house', 'outside']
});

app.get('/', async (req, res) => {
  const frog = await db.collection('frog').findOne({
    name: 'joey'
  });

  res.send(frog);
});

app.listen(9000, () => console.log('api listening on port 9000'));
