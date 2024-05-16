import mongoose, { model, Schema, Types } from 'mongoose';
import Project from './Project';
import User from './User';
import Team from './Team';

const StudioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'VALIDATOR ERROR: User does not exist!',
    },
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      validate: {
        validator: async (value: Types.ObjectId) => {
          const project = await Project.findById(value);
          return Boolean(project);
        },
        message: 'VALIDATOR ERROR: Project does not exist!',
      },
    },
  ],
  staff: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
          validator: async (value: Types.ObjectId) => {
            const user = await User.findById(value);
            return Boolean(user);
          },
          message: 'VALIDATOR ERROR: User does not exist!',
        },
      },
      spec: {
        name: {
          type: String,
        },
        rank: {
          type: String,
        },
      },
    },
  ],
  teams: [
    {
      teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        validate: {
          validator: async (value: Types.ObjectId) => {
            const team = await Team.findById(value);
            return Boolean(team);
          },
          message: 'VALIDATOR ERROR: Team does not exist!',
        },
      },
    },
  ],
});

StudioSchema.post('findOneAndDelete', async function (studio) {
  try {
    await Team.deleteMany({ studioId: studio._id });
    await Project.deleteMany({ studioId: studio._id });
  } catch (e) {
    console.log('Caught in middleware on try - ON STUDIO DELETE - ', e);
  }
});

const Studio = model('Studio', StudioSchema);
export default Studio;
