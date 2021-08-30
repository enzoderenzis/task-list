import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
const cors = require('cors');
import {init as initDBConnection } from './src/db';
import initData from './src/initData';

import callFakeApi from './src/fake.api';
import { getTasks, maskAsComplete } from './src/api';

initDBConnection().then(() => initData());
const app = express()
const port = 5000

app.use(cors());


app.get('/', (req, res) => {
  res.status(200).send('Hello TrueNorth!')
})

app.get('/tasks', async (req, res) => {
  const tasks = await callFakeApi(req.query.size);
  res.status(200).type('json').send({
    tasks
  });
})

app.put('/task/:taskId', (req, res) => {
  console.log(`task [${req.params.taskId}] DONE`);
  res.status(200).send("ok")
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await getTasks(req.query.size);
  console.log({tasks})
  res.status(200).type('json').send({
    tasks: tasks.map(t => ({
      uuid: t._id,
      title: t.title,
      status: t.status,
    }))
  });
});

app.put('/api/task/:taskId', async (req, res) => {
  await maskAsComplete(req.params.taskId);
  console.log(`task [${req.params.taskId}] DONE`);
  res.status(200).send("ok")
});

app.listen(port, () => {
  console.log(`TrueNorth app listening at http://localhost:${port}`);
})
