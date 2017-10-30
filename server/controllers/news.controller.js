import News from '../models/news';
import User from '../models/user';
import cuid from 'cuid';
import fs from 'fs';
import sanitizeHtml from 'sanitize-html';
import mongoose from 'mongoose';

export function getNews(req, res) {
  const string = (req.query.search  && req.query.search !== '') ? req.query.search : '.*';
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  const category = (req.query.category && req.query.category !== '') ?
    mongoose.Types.ObjectId(req.query.category) : '';
  if (category === '') {
    News.find(
      { type: 'news', title: { $regex: string, $options: 'i' }  },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
      .populate('city', 'name')
      .exec((err, news) => {
      if (err) {
        res.json({ news: [] });
      } else {
        res.json({ news });
      }
    });
  } else {
    News.find(
      { category: category, type: 'news', title: { $regex: string, $options: 'i' } },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
      .populate('city', 'name')
      .exec((err, news) => {
      if (err) {
        res.json({ news: [] });
      } else {
        res.json({ news });
      }
    });
  }
}
export function getBlogs(req, res) {
  const string = (req.query.search  && req.query.search !== '') ? req.query.search : '.*';
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  const topic = (req.query.topic && req.query.topic !== '') ?
    mongoose.Types.ObjectId(req.query.topic) : '';
  if (topic === '') {
    News.find(
      { type: 'blog', title: { $regex: string, $options: 'i' }  },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
      .populate('topic', 'title')
      .populate('city', 'name')
      .exec((err, blogs) => {
      if (err) {
        res.json({ blogs: [] });
      } else {
        res.json({ blogs });
      }
    });
  } else {
    News.find(
      { topic: topic, type: 'blog', title: { $regex: string, $options: 'i' } },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
      .populate('topic', 'title')
      .populate('city', 'name')
      .exec((err, blogs) => {
      if (err) {
        res.json({ blogs: [] });
      } else {
        res.json({ blogs });
      }
    });
  }
}

export function toggleNews(req, res) {
  const reqNews = req.body.news;
  if(reqNews && reqNews.hasOwnProperty('id')) {
    News.findOne({ _id: reqNews.id }, {} ,{ sort: { approved: -1, dateCreated: -1}}).exec((err, news) => {
      if (err) {
        res.json({ news: 'none' });
      } else {
        if (news) {
          News.findOneAndUpdate(
            { _id: reqNews.id },
            { approved: !news.approved },
            {
              fields: { _id: 1, name: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ news: 'error' });
            } else {
              res.json({ news: ret })
            }
          });
        } else {
          res.json({ news: 'none' });
        }
      }
    });
  } else {
    res.json({ news: 'missing' });
  }
}
export function vipNews(req, res) {
  const reqNews = req.body.news;
  if(reqNews && reqNews.hasOwnProperty('id') && reqNews.hasOwnProperty('vip')) {
    News.updateOne({ _id: reqNews.id }, { vip: reqNews.vip }).exec((err) => {
      if (err) {
        res.json({ news: 'error' });
      } else {
        res.json({ news: 'success' });
      }
    })
  }
}
