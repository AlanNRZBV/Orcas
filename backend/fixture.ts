import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Project from './models/Project';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    const collections = ['users', 'projects'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        email: 'user@orcas.com',
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user1@orcas.com',
        firstName: 'Полина',
        lastName: 'Кудрявцева',
        middleName: 'Эмировна',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user2@orcas.com',
        firstName: 'Марк',
        lastName: 'Андрианов',
        middleName: 'Львович',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user3@orcas.com',
        firstName: 'Анна',
        lastName: 'Кожевникова',
        middleName: 'Ивановна',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user4@orcas.com',
        firstName: 'Александр',
        lastName: 'Шишкин',
        middleName: 'Фёдорович',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'owner@orcas.com',
        firstName: 'Александр',
        lastName: 'Васильев',
        middleName: 'Михайлович',
        password: 'test',
        token: crypto.randomUUID(),
        role: 'admin',
        avatar: 'fixtures/avatar_admin.png',
      },
    ]);

    const user = await User.findOne({ email: 'user@orcas.com' }).populate('_id', 'firstName lastName');
    const user1 = await User.findOne({ email: 'user1@orcas.com' }).populate('_id', 'firstName lastName');
    const user2 = await User.findOne({ email: 'user2@orcas.com' }).populate('_id', 'firstName lastName');
    const user3 = await User.findOne({ email: 'user3@orcas.com' }).populate('_id', 'firstName lastName');
    const user4 = await User.findOne({ email: 'user4@orcas.com' }).populate('_id', 'firstName lastName');
    const owner = await User.findOne({ email: 'owner@orcas.com' }).populate('_id', 'firstName lastName');

    await Project.create([
      {
        name: 'ЖК МАГНОЛИЯ 147',
        team: [
          {
            userId: owner?._id,
            teamRole: 'арт-директор',
          },
          {
            userId: user?._id,
            teamRole: 'визуализатор',
          },
          {
            userId: user1?._id,
            teamRole: 'чертежник',
          },
          {
            userId: user2?._id,
            teamRole: 'дизайнер',
          },
          {
            userId: user3?._id,
            teamRole: 'менеджер',
          },
          {
            userId: user4?._id,
            teamRole: 'комплектатор',
          },
        ],
        expireAt: '2024.09.15',
      },
    ]);

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
