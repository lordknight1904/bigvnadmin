import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: 'String', required: true },
  alias: { type: 'String', required: true, unique: true },
  content: { type: 'String', required: true, maxLength: [2000, 'Độ dài vượt quá 2000 từ.'] },
  imageDirectories:[
    { type: 'String', required: true },
  ],
  disable: { type: 'bool', default: true },
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('Blog', blogSchema);
