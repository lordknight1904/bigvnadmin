import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: { type: 'String', required: true },
  alias: { type: 'String', required: true },
  disable: { type: 'bool', default: false },
  title: { type: 'String', required: true },
  metaKeyword: { type: 'String', required: true },
  metaDescription: { type: 'String', required: true },

  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('Topic', topicSchema);
