import Admin from './models/admin';
import bcrypt from 'bcrypt';

export default function () {
  Admin.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash('admin', salt).then((password) => {
        const newAdmin = new Admin({
          userName: 'sa',
          password: password,
          salt: salt,
          role: 'admin',
        });
        newAdmin.save((err) => {
          if(err) {
            console.log(err);
          }
        });
      });
    });
  });
}
