import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  district: { type: Schema.Types.ObjectId, ref: 'District' },
  ward: { type: Schema.Types.ObjectId, ref: 'Ward' },
  type: { type: 'String', required: true },
  address: { type: 'String' },
  title: { type: 'String', required: true, maxLength: [40, 'Độ dài vượt quá 150 từ.'] },
  alias: { type: 'String', required: true, unique: true },
  vip: { type: 'String', default: 'none' },
  price: { type: 'number' },
  content: { type: 'String', required: true, maxLength: [2000, 'Độ dài vượt quá 2000 từ.'] },
  summary: { type: 'String', default: '', maxLength: [200, 'Độ dài vượt quá 200 từ.'] },
  comment: { type: 'String', default: '' },
  imageDirectories:[
    { type: 'String', required: true },
  ],
  contact: {
    name: { type: 'String' },
    phone: { type: 'String' },
    address: { type: 'String' },
  },

  approved: { type: 'bool', default: false },
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('News', newsSchema);
