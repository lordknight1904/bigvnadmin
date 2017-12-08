import Keyword from '../models/keyword';
import KhongDau from "khong-dau";
import mongoose from "mongoose";

export function getKeyword(req, res) {
  const page = req.query.page ? req.query.page : 0;
  Keyword
    .find({ alias: { $regex: (req.query.search === '') ? req.query.search : '.', $options: 'gi' } })
    .sort('alias')
    .skip(10 * page)
    .limit(10)
    .exec((err, keywords) => {
      if (err) {
        res.json({ keywords: [] });
      } else {
        res.json({ keywords });
      }
    });
}

export function updateKeyword(req, res) {
  const reqKeyword = req.body.keyword;
  if (reqKeyword &&
    reqKeyword.hasOwnProperty('_id') &&
    reqKeyword.hasOwnProperty('disable')
  ) {
    Keyword.updateOne(
      { _id: mongoose.Types.ObjectId(reqKeyword._id) },
      { disable: !reqKeyword.disable }
      ).exec((err) => {
      if (err) {
        res.json({ keyword: 'error' });
      } else {
        res.json({ keyword: 'success' });
      }
    });
  } else {
    res.json({ keyword: 'missing' });
  }
}
