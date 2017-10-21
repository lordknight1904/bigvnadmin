import User from '../models/user';

export function getUser(req, res) {
  const string = (req.query.search && req.query.search !== '') ? req.query.search : '';
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  User.find(
    { userName: { $regex: `^${string}`, $options: 'i' }  },
    { _id: 1, userName: 1, fullName: 1, blogger: 1, newser: 1, googleId: 1, facebookId: 1, dateCreated: 1 },
    { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
  ).exec((err, users) => {
    if (err) {
      res.json({ users: [] });
    } else {
      res.json({ users });
    }
  });
}
export function toggleBlogger(req, res) {
  const reqUser = req.body.user;
  if(reqUser && reqUser.hasOwnProperty('id')) {
    User.findOne({ _id: reqUser.id }).exec((err, user) => {
      if (err) {
        res.json({ user: 'none' });
      } else {
        if (user) {
          User.findOneAndUpdate(
            { _id: reqUser.id },
            { blogger: !user.blogger },
            {
              fields: { _id: 1, userName: 1, fullName: 1, blogger: 1, newser: 1, googleId: 1, facebookId: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
              if (err2) {
                res.json({ user: 'error' });
              } else {
                res.json({ user: ret })
              }
            });
        } else {
          res.json({ user: 'none' });
        }
      }
    });
  } else {
    res.json({ user: 'missing' });
  }
}
export function toggleNewser(req, res) {
  const reqUser = req.body.user;
  if(reqUser && reqUser.hasOwnProperty('id')) {
    User.findOne({ _id: reqUser.id }).exec((err, user) => {
      if (err) {
        res.json({ user: 'none' });
      } else {
        if (user) {
          User.findOneAndUpdate(
            { _id: reqUser.id },
            { newser: !user.newser },
            {
              fields: { _id: 1, userName: 1, fullName: 1, blogger: 1, newser: 1, googleId: 1, facebookId: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ user: 'error' });
            } else {
              res.json({ user: ret })
            }
          });
        } else {
          res.json({ user: 'none' });
        }
      }
    });
  } else {
    res.json({ user: 'missing' });
  }
}
