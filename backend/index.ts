import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import usersRouter from './routers/users';
import projectsRouter from './routers/projects';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on port: ${port} `);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
