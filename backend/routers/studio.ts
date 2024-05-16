import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Studio from '../models/Studio';
import { StudioData, StudioDataWithOwner } from '../types';
import mongoose from 'mongoose';
import Project from '../models/Project';

const studioRouter = Router();

studioRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const ownerId = req.user?._id;

    if (!ownerId) {
      return res.status(404).send({ error: 'Пользователь не найден', user: {} });
    }

    const studio = await Studio.findOne({ owner: ownerId })
      .populate('owner', 'firstName lastName')
      .populate({ path: 'staff', populate: { path: 'userId', select: 'firstName lastName' } });

    if (!studio) {
      return res.status(404).send({ error: 'Студия не найдена', studio: {} });
    }

    const projectCheck = await Project.find({ studioId: studio._id });

    return res.send({ message: 'Студия успешно найдена', studio });
  } catch (e) {
    next(e);
  }
});

studioRouter.post('/', auth, async (req, res, next) => {
  try {
    const studioData: StudioDataWithOwner = {
      name: req.body.name,
      owner: req.body.owner,
      staff: req.body.staff ? req.body.staff : [],
      teams: req.body.teams ? req.body.teams : [],
      projects: req.body.projects ? req.body.projects : [],
    };

    const studio = new Studio(studioData);
    await studio.save();

    return res.send({ message: 'Студия успешно создана', studio });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

studioRouter.patch('/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Studio.findById(id);

    if (!isExist) {
      return res.status(404).send({ error: 'Данные о студии не найдены', studio: {} });
    }

    const studioData: StudioData = {
      name: req.body.name,
      staff: req.body.staff ? req.body.staff : [],
      teams: req.body.teams ? req.body.teams : [],
      projects: req.body.projects ? req.body.projects : [],
    };

    const updatedStudio = await Studio.findOneAndUpdate({ _id: id }, studioData, { new: true });

    return res.send({ message: 'Студия успешно обновлена', studio: updatedStudio });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
studioRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user?._id;
    const isExist = await Studio.findById(id);

    if (!isExist) {
      return res.status(404).send({ error: 'Данные о студии не найдены', studio: {} });
    }

    const check = await Studio.findOne({ _id: id });

    console.log(check?.owner.toString());
    console.log(userId?.toString());

    if (check?.owner.toString() !== userId?.toString()) {
      return res.status(422).send({ error: 'Нет доступа', studio: {} });
    }

    const deletedStudio = await Studio.findOneAndDelete({ _id: id });

    return res.send({ message: 'Студия успешно удалена', studio: deletedStudio });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default studioRouter;
