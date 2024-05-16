import mongoose, { model, Schema, Types } from 'mongoose';
import User from './User';
import Studio from './Studio';
import Project from './Project';

const TeamSchema = new mongoose.Schema({
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
  members: [
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
      },
    },
  ],
});

TeamSchema.post('findOneAndDelete', async function (team) {
  try {
    const s = await Studio.updateMany(
      { 'teams.teamId': team._id },
      { $pull: { teams: { teamId: team._id } } },
      { new: true },
    );
  } catch (e) {}
});

const Team = model('Team', TeamSchema);
export default Team;
