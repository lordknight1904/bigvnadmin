import District from '../models/district';
import mongoose from 'mongoose';

export function createDistrict(req, res) {
  const reqDistrict =  req.body.district;
  if (reqDistrict &&
    reqDistrict.hasOwnProperty('name') &&
    reqDistrict.hasOwnProperty('cityId')
  ) {
    const district = new District({
      city: reqDistrict.cityId,
      name: reqDistrict.name,
    });
    district.save((err) => {
      if (err) {
        res.json({ district: 'error' });
      } else {
        res.json({ district: 'success' });
      }
    });
  } else {
    res.json({ district: 'missing' });
  }
}

export function getDistricts(req, res) {
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  if (req.params.cityId) {
    District.find(
      { city: mongoose.Types.ObjectId(req.params.cityId) },
      {},
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    ).exec((err, districts) => {
      if (err) {
        res.json({ districts: [] });
      } else {
        res.json({ districts });
      }
    });
  } else {
    res.json({ districts: [] });
  }
}
export function getDistrictsAll(req, res) {
  if (req.params.cityId) {
    District.find({}).exec((err, districts) => {
      if (err) {
        res.json({ districts: [] });
      } else {
        res.json({ districts });
      }
    });
  } else {
    res.json({ districts: [] });
  }
}
export function none(req, res) {
  res.json({ districts: 'none' });
}

export function toggleDistrict(req, res) {
  const reqDistrict = req.body.district;
  if(reqDistrict && reqDistrict.hasOwnProperty('id')) {
    District.findOne({ _id: reqDistrict.id }).exec((err, district) => {
      if (err) {
        res.json({ district: 'none' });
      } else {
        if (district) {
          District.findOneAndUpdate(
            { _id: reqDistrict.id },
            { disable: !district.disable },
            {
              fields: { _id: 1, name: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ district: 'error' });
            } else {
              res.json({ district: ret })
            }
          });
        } else {
          res.json({ district: 'none' });
        }
      }
    });
  } else {
    res.json({ district: 'missing' });
  }
}
