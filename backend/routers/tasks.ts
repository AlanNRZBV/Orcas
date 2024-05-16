import { Router } from 'express';
import auth from '../middleware/auth';
import Studio from '../models/Studio';
import Task from '../models/Task';
import project from '../models/Project';
import Project from '../models/Project';

const tasksRouter = Router();

tasksRouter.get('/', auth, async (req, res, next) => {
  try {
    const projectId = req.query.project;
    const studioId = req.query.studio;

    if ((!studioId && !projectId) || (!studioId && projectId)) {
      return res.status(404).send({ error: 'Ошибка ввода данных', tasks: [] });
    }

    if (studioId && !projectId) {
      const studio = await Studio.findById(studioId);

      if (!studio) {
        return res.status(404).send({ error: 'Студия не найдена', tasks: [] });
      }

      const tasks = studio.tasks;
      const isEmpty = tasks.length < 1;

      if (isEmpty) {
        return res.send({ message: 'Нет заданий', tasks: [] });
      }

      return res.send({ message: 'Задания успешно найдены', tasks: tasks });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ error: 'Проект не найден', tasks: [] });
    }
    const tasks = await Task.find({ projectId: projectId });
    const isEmpty = tasks.length < 1;
    if (isEmpty) {
      return res.send({ message: 'Нет заданий', tasks: [] });
    }
    return res.send({ message: 'Задания успешно найдены', tasks: tasks });
  } catch (e) {
    next(e);
  }
});

export default tasksRouter;
