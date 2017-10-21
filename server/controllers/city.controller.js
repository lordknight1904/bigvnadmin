import City from '../models/city';

export function createCity(req, res) {
  const reqCity =  req.body.city;
  if (reqCity &&
    reqCity.hasOwnProperty('name')
  ) {
    const city = new City({
      name: reqCity.name
    });
    city.save((err) => {
      if (err) {
        res.json({ city: 'error' });
      } else {
        res.json({ city: 'success' });
      }
    });
  } else {
    res.json({ city: 'missing' });
  }
}
export function getCities(req, res) {
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  City.find(
    {},
    {},
    { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
  ).exec((err, cities) => {
    if (err) {
      res.json({ cities: [] });
    } else {
      res.json({ cities });
    }
  });
}
export function getCitiesAll(req, res) {
  City.find({}).exec((err, cities) => {
    if (err) {
      res.json({ cities: [] });
    } else {
      res.json({ cities });
    }
  });
}
export function toggleCity(req, res) {
  const reqCity = req.body.city;
  if(reqCity && reqCity.hasOwnProperty('id')) {
    City.findOne({ _id: reqCity.id }).exec((err, city) => {
      if (err) {
        res.json({ city: 'none' });
      } else {
        if (city) {
          City.findOneAndUpdate(
            { _id: reqCity.id },
            { disable: !city.disable },
            {
              fields: { _id: 1, name: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ city: 'error' });
            } else {
              res.json({ city: ret })
            }
          });
        } else {
          res.json({ city: 'none' });
        }
      }
    });
  } else {
    res.json({ city: 'missing' });
  }
}
