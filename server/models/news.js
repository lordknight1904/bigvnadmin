import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  district: { type: Schema.Types.ObjectId, ref: 'District', required: true },
  ward: { type: Schema.Types.ObjectId, ref: 'Ward', required: true },
  address: { type: 'String', required: true },
  title: { type: 'String', required: true },
  alias: { type: 'String', required: true, unique: true },
  vip: { type: 'String', default: 'none' },
  price: { type: 'number', required: true },
  content: { type: 'String', required: true, maxLength: [2000, 'Độ dài vượt quá 2000 từ.'] },
  imageDirectories:[
    { type: 'String', required: true },
  ],
  contact: {
    name: { type: 'String', required: true },
    phone: { type: 'String', required: true },
    address: { type: 'String', required: true },
  },

  approved: { type: 'bool', default: false },
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('News', newsSchema);
