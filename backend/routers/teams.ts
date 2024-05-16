import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Team from '../models/Team';
import mongoose from 'mongoose';
import { TeamData } from '../types';
import Studio from '../models/Studio';

const teamsRouter = Router();

teamsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user?._id;
    const studioId = req.query.studio;
    const teams = await Team.find({ studioId: studioId });
    const studio = await Studio.findById(studioId);
    const isEmpty = teams.length < 1;

    if (isEmpty) {
      return res.send({ message: 'В студии нет команд', teams: [] });
    }

    if (studio?.owner.toString() !== user?._id) {
      return res.status(422).send({ message: 'Нет доступа', teams: [] });
    }

    return res.send({ message: 'Команды успешно найдены', teams: teams });
  } catch (e) {
    next(e);
  }
});

teamsRouter.post('/', auth, async (req, res, next) => {
  try {
    const id: string = req.body.studioId;

    const isStudioExists = await Studio.findById(id);
    if (!isStudioExists) {
      return res.status(404).send({ message: 'Студия не найдена', team: [] });
    }

    const teamData: TeamData = {
      studioId: req.body.studioId,
      name: req.body.name,
      members: req.body.members,
    };

    const team = new Team(teamData);
    await team.save();
    isStudioExists.teams.push({ teamId: team._id });
    await isStudioExists.save();

    return res.send({ message: 'Команда успешно создана', team });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
      return res.status(422).send({ message: 'Ошибка проверки данных', errorMsg: e });
    }
    next(e);
  }
});

teamsRouter.patch('/update/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Team.findById(id);

    if (!isExist) {
      return res.status(404).send({ message: 'Команда не найдена', team: [] });
    }

    const teamData: TeamData = {
      studioId: req.body.studioId,
      name: req.body.name,
      members: req.body.members,
    };

    const updatedTeam = await Team.findOneAndUpdate({ _id: id }, teamData, { new: true });

    return res.send({ message: 'Команда успешно обновлена', team: updatedTeam });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
      return res.status(422).send({ message: 'Ошибка проверки данных', errorMsg: e });
    }
    next(e);
  }
});

teamsRouter.delete('/delete/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Team.findById(id);

    if (!isExist) {
      return res.status(404).send({ message: 'Команда не найдена', team: [] });
    }

    const deletedTeam = await Team.findOneAndDelete({ _id: id });
    return res.send({ message: 'Команда успешно удалена', team: deletedTeam });
  } catch (e) {}
});

export default teamsRouter;
