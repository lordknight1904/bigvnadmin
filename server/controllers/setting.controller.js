import Setting from '../models/setting';
import KhongDau from 'khong-dau';

export function getSettings(req, res) {
  Setting.find({}, {}, { sort: { disable: -1 } }).exec((err, settings) => {
    if(err) {
      res.json({ settings: [] });
    } else {
      res.json({ settings });
    }
  })
}
export function createSetting(req, res) {
  const reqSetting =  req.body.setting;
  if (reqSetting &&
    reqSetting.hasOwnProperty('name') &&
    reqSetting.hasOwnProperty('value')
  ) {
    const setting = new Setting({
      name: reqSetting.name,
      value: reqSetting.value,
    });
    setting.save((err2) => {
      if (err2) {
        res.json({ setting: 'error' });
      } else {
        res.json({ setting: 'success' });
      }
    });
  } else {
    res.json({ setting: 'missing' });
  }
}

export function toggleSetting(req, res) {
  const reqSetting = req.body.setting;
  if(reqSetting && reqSetting.hasOwnProperty('id')) {
    Setting.findOne({ _id: reqSetting.id }).exec((err, setting) => {
      if (err) {
        res.json({ setting: 'none' });
      } else {
        if (setting) {
          Setting.findOneAndUpdate(
            { _id: reqSetting.id },
            { disable: !setting.disable },
            {
              fields: { _id: 1, name: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ setting: 'error' });
            } else {
              res.json({ setting: ret })
            }
          });
        } else {
          res.json({ setting: 'none' });
        }
      }
    });
  } else {
    res.json({ setting: 'missing' });
  }
}
export function modifySetting(req, res) {
  const reqSetting = req.body.setting;
  if(reqSetting && reqSetting.hasOwnProperty('id') && reqSetting.hasOwnProperty('value')) {
    Setting.updateOne({ _id: reqSetting.id }, { value: reqSetting.value }).exec((err) => {
      if (err) {
        res.json({ setting: 'error' });
      } else {
        res.json({ setting: 'success' });
      }
    })
  } else {
    res.json({ setting: 'missing' });
  }
}
