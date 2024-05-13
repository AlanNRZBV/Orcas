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
      teamRole: {
        type: String,
        required: true,
        enum: ['дизайнер', 'менеджер', 'арт-директор', 'визуализатор', 'чертежник', 'комплектатор'],
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
