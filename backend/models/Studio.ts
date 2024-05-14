import mongoose, { model, Schema, Types } from 'mongoose';
import Project from './Project';
import User from './User';
import Team from './Team';
import { rank, roles } from '../constants';

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
        type: {
          name: {
            type: String,
            enum: roles,
          },
          rank: {
            type: String,
            enum: rank,
          },
        },
        required: true,
        default: {
          name: 'unassigned',
          rank: 'unassigned',
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

const Studio = model('Studio', StudioSchema);
export default Studio;
