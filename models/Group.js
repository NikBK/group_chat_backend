const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to set default members to createdBy if not provided
GroupSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      // If members array is not provided or is empty, set it to createdBy
      if (!this.members || this.members.length === 0 || !this.members.includes(this.createdBy)) {
        this.members = [...this.members, this.createdBy];
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
