import { model, Schema, Types } from 'mongoose';
import User from './User';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: [
    {
      userId: {
        type: Types.ObjectId,
        required: true,
        validate: async (value: Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: 'VALIDATOR ERROR: Пользователь не найден',
      },
      teamRole: {
        type: String,
        enum: ['дизайнер', 'менеджер', 'арт директор', 'визуализатор', 'чертежник', 'комплектатор'],
      },
    },
  ],
  createdAt: {
    type: Date(),
    required: true,
    default: new Date(),
  },
  expireAt: {
    type: Date(),
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
