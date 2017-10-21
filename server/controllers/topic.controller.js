import Topic from '../models/topic';
import KhongDau from 'khong-dau';

export function getTopics(req, res) {
  Topic.find({}).exec((err, topics) => {
    if(err) {
      res.json({ topics: [] });
    } else {
      res.json({ topics });
    }
  })
}
export function createTopic(req, res) {
  const reqTopic =  req.body.topic;
  if (reqTopic &&
    reqTopic.hasOwnProperty('title')
  ) {
    const alias = KhongDau(reqTopic.title).trim().replace(/ /g, "-");
    const topic = new Topic({
      title: reqTopic.title,
      alias,
    });
    topic.save((err2) => {
      if (err2) {
        res.json({ topic: 'error' });
      } else {
        res.json({ topic: 'success' });
      }
    });
  } else {
    res.json({ topic: 'missing' });
  }
}
export function toggleTopic(req, res) {
  const reqTopic = req.body.topic;
  if(reqTopic && reqTopic.hasOwnProperty('id')) {
    Topic.findOne({ _id: reqTopic.id }).exec((err, topic) => {
      if (err) {
        res.json({ topic: 'none' });
      } else {
        if (topic) {
          Topic.findOneAndUpdate(
            { _id: reqTopic.id },
            { disable: !topic.disable },
            {
              fields: { _id: 1, name: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ topic: 'error' });
            } else {
              res.json({ topic: ret })
            }
          });
        } else {
          res.json({ topic: 'none' });
        }
      }
    });
  } else {
    res.json({ topic: 'missing' });
  }
}
