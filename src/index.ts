import { MongoClient } from 'mongodb';
import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// connect to database
const client = new MongoClient(typeof process.env.DATABASE_URL === 'undefined' ? '' : process.env.DATABASE_URL);
client.connect(() => console.log('connected to database'));
const db = client.db();
const prisma = new PrismaClient();

const app = express();

(async () => {
  // insert object into frog collection with these properties
  await prisma.frog.create({
    data: {
      name: 'connor',
      smol: false,
      habitat: ['rainforest', 'his house', 'outside']
    }
  });

  app.get('/', async (req, res) => {
    // find frog in frog collection with property name: 'joey'
    const frog = await prisma.frog.findFirst({
      where: {
        name: 'connor'
      }
    });

    // send as response
    res.send(frog);
  });

  app.listen(9000, () => console.log('api listening on port 9000'));
})().finally(() => prisma.$disconnect());
