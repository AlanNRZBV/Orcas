import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';

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
    const collections = ['users'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        email: 'user@orcas.com',
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
        role: 'employee',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'owner@orcas.com',
        firstName: 'Александр',
        lastName: 'Васильев',
        middleName: 'Михайлович',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
        role: 'owner',
        avatar: '',
      },
    ]);

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
