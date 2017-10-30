import Banner from '../models/banner';
import fs from 'fs';
import cuid from 'cuid';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';


function writeImage(base64image) {
  return new Promise(function(resolve, reject) {
    const ext = base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = base64image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const date = Date.now();
    const srcImageName = `${date.toString()}_${cuid()}`;

    fs.writeFile(`public/${srcImageName}.${ext}`, buf, (err) => {
      if (err) {
        reject('error')
      } else {
        imagemin([`public/${srcImageName}.${ext}`], './public', {
          plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
          ]
        }).then(files => {
          const imageName = `${date.toString()}_${cuid()}`;
          fs.writeFile(`public/${imageName}.${ext}`, files[0].data, (err2) => {
            if (err2) {
              reject('error')
            } else {
              fs.unlink(`public/${srcImageName}.${ext}`, (err) => {});
              resolve(`${imageName}.${ext}`);
            }
          });
          // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
        });
      }
    });
  });
}
export function createBanner(req, res) {
  const reqBanner = req.body.banner;
  if (reqBanner &&
      reqBanner.hasOwnProperty('name') &&
      reqBanner.hasOwnProperty('description') &&
      reqBanner.hasOwnProperty('base64image')
  ) {
    const ext = reqBanner.base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = reqBanner.base64image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const date = Date.now();
    const srcImageName = `${date.toString()}_${cuid()}`;
    fs.writeFile(`banner/${srcImageName}.${ext}`, buf, (err) => {
      if (err) {
        res.json({ banner: 'error' });
      }
      else {
        imagemin([`banner/${srcImageName}.${ext}`], './banner', {
          plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
          ]
        }).then(files => {
          const imageName = `${date.toString()}_${cuid()}`;
          fs.writeFile(`banner/${imageName}.${ext}`, files[0].data, (err2) => {
            if (err2) {
              console.log('error');
            } else {
              const banner = new Banner({
                name: reqBanner.name,
                description: reqBanner.description,
                link: reqBanner.link,
                imageDirectory: `${imageName}.${ext}`,
              });
              banner.save((err) => {
                if (err) {
                  res.json({ banner: 'error' });
                } else {
                  res.json({ banner: 'success' });
                }
              });
              fs.unlink(`banner/${srcImageName}.${ext}`, (err) => {});
            }
          });
          // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
        });
      }
    });
  } else {
    res.json({ banner: 'missing' });
  }
}
export function getBanner(req, res) {
  const string = (req.query.search  && req.query.search !== '') ? req.query.search : '';
  const page = (req.query.page && req.query.page !== '') ? req.query.page : 0;
  Banner.find(
    { name: { $regex: `^${string}`, $options: 'i' }  },
    { name: 1, _id: 1, dateCreated: 1, description: 1, imageDirectory: 1 },
    { skip: 10 * page, limit: 10, sort: { dateCreated: -1 } }
  ).exec((err, banners) => {
    if (err) {
      res.json({ banners: [] });
    } else {
      res.json({ banners });
    }
  })
}
export function uploadBanner(req, res) {
  const reqFile = req.body.file;
  if (reqFile && reqFile.hasOwnProperty('base64image') && reqFile.hasOwnProperty('id')) {
    const ext = reqFile.base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = reqFile.base64image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const date = Date.now();
    const imageName = `${date.toString()}_${cuid()}`;
    fs.writeFile(`banner/${imageName}.${ext}`, buf, (err) => {
      if (err) {
        res.json({ banner: 'error' });
      } else {
        Banner.updateOne({ _id: reqFile.id }, { imageDirectory: `${imageName}.${ext}` }).exec((err) => {
          if (err) {
            res.json({ banner: 'error' });
          } else {
            res.json({ banner: 'success' });
          }
        });
      }
    });
  } else {
    res.json({ banner: 'error' });
  }
}

export function toggleBanner(req, res) {
  const reqBanner = req.body.banner;
  if(reqBanner && reqBanner.hasOwnProperty('id')) {
    Banner.findOne({ _id: reqBanner.id }).exec((err, banner) => {
      if (err) {
        res.json({ banner: 'none' });
      } else {
        if (banner) {
          Banner.findOneAndUpdate(
            { _id: reqBanner.id },
            { disable: !banner.disable },
            {
              fields: { _id: 1, name: 1, imageDirectory: 1, description: 1, disable: 1, dateCreated: 1 },
              new: true
            }).exec((err2, ret) => {
            if (err2) {
              res.json({ banner: 'error' });
            } else {
              res.json({ banner: ret })
            }
          });
        } else {
          res.json({ banner: 'none' });
        }
      }
    });
  } else {
    res.json({ city: 'missing' });
  }
}
