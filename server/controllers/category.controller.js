import Category from '../models/category';
import KhongDau from 'khong-dau';
import mongoose from 'mongoose';

export function getCategories(req, res) {
  Category.find({}).exec((err, categories) => {
    if(err) {
      res.json({ categories: [] });
    } else {
      res.json({ categories });
    }
  })
}
export function createCategory(req, res) {
  const reqCategory =  req.body.category;
  if (reqCategory &&
    reqCategory.hasOwnProperty('name') &&
    reqCategory.hasOwnProperty('title') &&
    reqCategory.hasOwnProperty('metaKeyword') &&
    reqCategory.hasOwnProperty('metaDescription')
  ) {
    Category.find({}, {}, { sort: { term_id: -1 } }).exec((err, doc) => {
      if (err) {
        res.json({ category: 'error' });
      } else {
        const term_id = (doc.length > 0) ? (Number(doc[0].term_id) + 1) : 1;
        const alias = KhongDau(reqCategory.title).trim().toLowerCase().replace(/ /g, "-");
        const category = new Category({
          term_id,
          name: reqCategory.name.toUpperCase(),
          alias,
          title: reqCategory.title,
          metaKeyword: reqCategory.metaKeyword,
          metaDescription: reqCategory.metaDescription,
        });
        category.save((err2) => {
          if (err2) {
            res.json({ category: 'error' });
          } else {
            res.json({ category: 'success' });
          }
        });
      }
    });
  } else {
    res.json({ category: 'missing' });
  }
}

export function updateCategory(req, res) {
  const reqCategory =  req.body.category;
  if (reqCategory &&
    reqCategory.hasOwnProperty('name') &&
    reqCategory.hasOwnProperty('title') &&
    reqCategory.hasOwnProperty('metaKeyword') &&
    reqCategory.hasOwnProperty('metaDescription') &&
    reqCategory.hasOwnProperty('id')
  ) {
    const alias = KhongDau(reqCategory.title).trim().toLowerCase().replace(/ /g, "-");
    Category.updateOne(
      { _id: mongoose.Types.ObjectId(reqCategory.id) },
      {
        name: reqCategory.name.toUpperCase(),
        title: reqCategory.title,
        metaKeyword: reqCategory.metaKeyword,
        metaDescription: reqCategory.metaDescription,
        alias
      }).exec((err) => {
      if (err) {
        res.json({ category: 'error' });
      } else {
        res.json({ category: 'success' });
      }
    });
  } else {
    res.json({ category: 'missing' });
  }
}
