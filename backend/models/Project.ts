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
  tasks: [
    {
      taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        validate: {
          validator: async (value: Types.ObjectId) => {
            const task = await Project.findById(value);
            return Boolean(task);
          },
          message: 'VALIDATOR ERROR: Project does not exist!',
        },
      },
    },
  ],

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

ProjectSchema.post('findOneAndDelete', async function (project) {
  try {
    await Studio.updateMany({ 'projects.projectId': project._id }, { $pull: { projects: { projectId: project._id } } });
  } catch (e) {
    console.log('Caught in middleware on try - ON TEAM DELETE - ', e);
  }
});

const Project = model('Project', ProjectSchema);
export default Project;
