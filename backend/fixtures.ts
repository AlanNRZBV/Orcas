import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Project from './models/Project';
import Studio from './models/Studio';
import Team from './models/Team';

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
    const collections = ['users', 'projects', 'teams', 'studios'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        email: 'user@orcas.com',
        firstName: 'Иван',
        lastName: 'Иванов',
        password: 'test',
        token: crypto.randomUUID(),
        isOwner: true,
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user1@orcas.com',
        firstName: 'Полина',
        lastName: 'Кудрявцева',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'дизайнер',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user2@orcas.com',
        firstName: 'Марк',
        lastName: 'Андрианов',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'архитектор',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user3@orcas.com',
        firstName: 'Анна',
        lastName: 'Кожевникова',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'чертежник',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user4@orcas.com',
        firstName: 'Александр',
        lastName: 'Шишкин',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'менеджер',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user5@orcas.com',
        firstName: 'Александр',
        lastName: 'Васильев',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'арт-директор',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user6@orcas.com',
        firstName: 'Никита',
        lastName: 'Матвеев',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'визуализатор',
          rank: 'senior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user7@orcas.com',
        firstName: 'Андрей',
        lastName: 'Соколов',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'визуализатор',
          rank: 'middle',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user8@orcas.com',
        firstName: 'Максим',
        lastName: 'Гришин',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'визуализатор',
          rank: 'junior',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'user9@orcas.com',
        firstName: 'Алиса',
        lastName: 'Федорова',
        password: 'test',
        token: crypto.randomUUID(),
        spec: {
          name: 'дизайнер',
          rank: 'middle',
        },
        role: 'user',
        avatar: 'fixtures/avatar_user.png',
      },
    ]);

    const user = await User.findOne({ email: 'user@orcas.com' });
    const user1 = await User.findOne({ email: 'user1@orcas.com' }); // designer sen
    const user2 = await User.findOne({ email: 'user2@orcas.com' }); // architect sen
    const user3 = await User.findOne({ email: 'user3@orcas.com' }); // layout sen
    const user4 = await User.findOne({ email: 'user4@orcas.com' }); // manager sen
    const user5 = await User.findOne({ email: 'user5@orcas.com' }); // art-dir sen
    const user6 = await User.findOne({ email: 'user6@orcas.com' }); // viz sen
    const user7 = await User.findOne({ email: 'user7@orcas.com' }); // viz mid
    const user8 = await User.findOne({ email: 'user8@orcas.com' }); // viz junior
    const user9 = await User.findOne({ email: 'user9@orcas.com' }); // des middle

    await Team.create([
      {
        name: 'Команда 1',
        members: [
          {
            userId: user1?._id,
            teamRole: user1?.spec.name,
          },
          {
            userId: user3?._id,
            teamRole: user3?.spec.name,
          },
          {
            userId: user6?._id,
            teamRole: user6?.spec.name,
          },
        ],
      },
      {
        name: 'Команда 2',
        members: [
          {
            userId: user1?._id,
            teamRole: user1?.spec.name,
          },
          {
            userId: user2?._id,
            teamRole: user2?.spec.name,
          },
          {
            userId: user6?._id,
            teamRole: user6?.spec.name,
          },
          {
            userId: user7?._id,
            teamRole: user6?.spec.name,
          },
        ],
      },
    ]);

    const team1 = await Team.findOne({ name: 'Команда 1' });
    const team2 = await Team.findOne({ name: 'Команда 2' });

    await Project.create([
      {
        name: 'ЖК МАГНОЛИЯ 147',
        team: [
          {
            teamId: team1?._id,
          },
        ],
        expireAt: '2024.09.15',
      },
      {
        name: 'ЖК КИРПИЧ 1/2',
        team: [
          {
            teamId: team2?._id,
          },
        ],
        expireAt: '2025.03.12',
      },
    ]);

    const proj1 = await Project.findOne({ name: 'ЖК МАГНОЛИЯ 147' });
    const proj2 = await Project.findOne({ name: 'ЖК КИРПИЧ 1/2' });

    await Studio.create({
      name: 'ABC',
      owner: user5?._id,
      staff: [
        {
          userId: user?._id,
        },
        {
          userId: user1?._id,
        },
        {
          userId: user2?._id,
        },
        {
          userId: user3?._id,
        },
        {
          userId: user4?._id,
        },
        {
          userId: user5?._id,
        },
        {
          userId: user6?._id,
        },
        {
          userId: user7?._id,
        },
        {
          userId: user8?._id,
        },
        {
          userId: user9?._id,
        },
      ],
      teams: [
        {
          teamId: team1?._id,
        },
        {
          teamId: team2?._id,
        },
      ],
      projects: [
        {
          projectId: proj1?._id,
        },
        {
          projectId: proj2?._id,
        },
      ],
    });

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
