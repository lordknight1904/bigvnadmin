import Blog from '../models/blog';
import cuid from 'cuid';
import fs from 'fs';
import sanitizeHtml from 'sanitize-html';
import KhongDau from 'khong-dau';
import mongoose from 'mongoose';

export function getBlog(req, res) {
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  const topic = (req.query.topic && req.query.topic !== '') ?
    mongoose.Types.ObjectId(req.query.topic) : '';
  if (topic === '') {
    Blog.find(
      {  },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
      .populate('city', 'name')
      .exec((err, blogs) => {
      if (err) {
        res.json({ blogs: [] });
      } else {
        res.json({ blogs });
      }
    });
  } else {
    Blog.find(
      { topic: topic },
      {  },
      { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
    )
      .populate('category', 'title')
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

export function toggleBlog(req, res) {
  const reqBlog = req.body.blog;
  if(reqBlog && reqBlog.hasOwnProperty('id')) {
    Blog.findOne({ _id: reqBlog.id }).exec((err, blog) => {
      if (err) {
        res.json({ blog: 'none' });
      } else {
        if (blog) {
          Blog.findOneAndUpdate(
            { _id: reqBlog.id },
            { disable: !blog.disable },
            {
              fields: { _id: 1, title: 1, disable: 1, topic: 1, alias: 1, content: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ blog: 'error' });
            } else {
              res.json({ blog: ret })
            }
          });
        } else {
          res.json({ blog: 'none' });
        }
      }
    });
  } else {
    res.json({ blog: 'missing' });
  }
}

export function uploadImage(req, res) {
  const reqFile = req.body.file;
  if (reqFile && reqFile.hasOwnProperty('base64image')) {
    const ext = reqFile.base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = reqFile.base64image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const date = Date.now();
    const imageName = `${date.toString()}_${cuid()}`;
    fs.writeFile(`blog/${imageName}.${ext}`, buf, (err) => {
      if (err) {
        res.json({ blog: 'error' });
      }
      else {
        res.json({ blog: `${imageName}.${ext}` });
      }
    });
  } else {
    res.json({ blog: 'error' });
  }
}
export function createBlog(req, res) {
  const reqBlog = req.body.blog;
  if (reqBlog &&
    reqBlog.hasOwnProperty('title') &&
    reqBlog.hasOwnProperty('topic') &&
    reqBlog.hasOwnProperty('imageDirectories') &&
    reqBlog.hasOwnProperty('content')
  ) {
    const alias = KhongDau(reqBlog.title).trim().replace(/ /g, "-");
    const blog = new Blog({
      title: reqBlog.title,
      topic: reqBlog.topic,
      alias,
      content: reqBlog.content,
      imageDirectories: reqBlog.imageDirectories,
    });
    blog.save((err) => {
      if (err) {
        res.json({ blog: 'error' });
      } else {
        res.json({ blog: 'success' });
      }
    });
  } else {
    res.json({ blog: 'missing' });
  }
}
