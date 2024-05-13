import { model, Schema, Types } from 'mongoose';
import User from './User';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: [],
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
