import { model, Schema, Types } from 'mongoose';
import Team from './Team';
import Studio from './Studio';

const ProjectSchema = new Schema({
  studioId: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const studio = await Studio.findById(value);
        return Boolean(studio);
      },
      message: 'VALIDATOR ERROR: Studio does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  team: [
    {
      teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
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
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  expireAt: {
    type: Date,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Project = model('Project', ProjectSchema);
export default Project;
