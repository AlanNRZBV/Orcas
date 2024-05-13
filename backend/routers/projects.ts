import { Router } from 'express';
import auth from '../middleware/auth';
import Project from '../models/Project';
import { ProjectData } from '../types';
import mongoose from 'mongoose';
import permit from '../middleware/permit';

const projectsRouter = Router();

projectsRouter.get('/', auth, async (req, res, next) => {
  try {
    const projects = await Project.find().populate({
      path: 'team',
      populate: {
        path: 'teamId',
        select: '-_id',
        populate: {
          path: 'members',
          select: '-_id',
          populate: {
            path: 'userId',
            select: '-_id firstName lastName spec',
          },
        },
      },
    });

    const isEmpty = projects.length < 1;
    if (isEmpty) {
      return res.status(404).send({ message: 'Нет проектов', projects: [] });
    }
    return res.send({ message: 'Данные успешно загружены', projects });
  } catch (e) {
    next(e);
  }
});

projectsRouter.post('/add-project', auth, async (req, res, next) => {
  try {
    const projectData: ProjectData = {
      name: req.body.name,
      team: req.body.team,
      expireAt: req.body.expireAt,
    };

    const project = new Project(projectData);
    await project.save();

    return res.send({ message: 'Проект успешно создан', project });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send({ message: 'Ошибка проверки данных', errorMsg: e });
    }
    next(e);
  }
});

projectsRouter.patch('/update/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Project.findOne({ _id: id });

    if (!isExist) {
      return res.status(404).send({ message: 'Проекта не существует', project: {} });
    }

    const projectData: ProjectData = {
      name: req.body.name,
      team: req.body.team,
      expireAt: req.body.expireAt,
    };

    const updatedProject = await Project.findOneAndUpdate({ _id: id }, projectData, { new: true });

    return res.send({ message: 'Данные обновлены', project: updatedProject });
  } catch (e) {
    next(e);
  }
});

projectsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Project.findOne({ _id: id });

    if (!isExist) {
      return res.status(404).send({ message: 'Проекта не существует', project: {} });
    }

    const deletedProject = await Project.findOneAndDelete({ _id: id });

    return res.send({ message: 'Проект удален', project: deletedProject });
  } catch (e) {
    next(e);
  }
});

export default projectsRouter;
