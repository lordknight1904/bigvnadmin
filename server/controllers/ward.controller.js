import Ward from '../models/ward';
import mongoose from 'mongoose';

export function createWard(req, res) {
  const reqWard =  req.body.ward;
  if (reqWard &&
    reqWard.hasOwnProperty('name') &&
    reqWard.hasOwnProperty('district')
  ) {
    const ward = new Ward({
      district: reqWard.district,
      name: reqWard.name,
    });
    ward.save((err) => {
      if (err) {
        res.json({ ward: 'error' });
      } else {
        res.json({ ward: 'success' });
      }
    });
  } else {
    res.json({ ward: 'missing' });
  }
}

export function getWards(req, res) {
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  if (req.params.districtId) {
    Ward.find(
      { district: mongoose.Types.ObjectId(req.params.districtId) },
      {},
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    ).exec((err, wards) => {
      if (err) {
        res.json({ wards: [] });
      } else {
        res.json({ wards });
      }
    });
  } else {
    res.json({ wards: [] });
  }
}
export function getWardsAll(req, res) {
  if (req.params.districtId) {
    Ward.find({}).exec((err, wards) => {
      if (err) {
        res.json({ wards: [] });
      } else {
        res.json({ wards });
      }
    });
  } else {
    res.json({ wards: [] });
  }
}

export function none(req, res) {
  res.json({ districts: 'none' });
}
