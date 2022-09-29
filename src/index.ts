import { MongoClient } from 'mongodb';
import express from 'express';
import 'dotenv/config';

// connect to database
const client = new MongoClient(typeof process.env.DATABASE_URL === 'undefined' ? '' : process.env.DATABASE_URL);
client.connect(() => console.log('connected to database'));
const db = client.db();

const app = express();

// insert object into frog collection with these properties
db.collection('frog').insertOne({
  name: 'joey',
  smol: false,
  habitat: ['rainforest', 'his house', 'outside']
});

app.get('/', async (req, res) => {
  // find frog in frog collection with property name: 'joey'
  const frog = await db.collection('frog').findOne({
    name: 'joey'
  });

  // send as response
  res.send(frog);
});

app.listen(9000, () => console.log('api listening on port 9000'));
