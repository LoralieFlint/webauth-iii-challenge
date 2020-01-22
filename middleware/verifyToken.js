// const jwt = require('jsonwebtoken')

// module.exports = (req, res, next) => {
// const token = req.headers.au

//   if(token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({
//           message: 'not verified'
//         })
//       } else {
//         req.decodedToken = decodedToken
//         userModel
//         .find()
//         .then(users => {
//           res.json(users);
//         })
//         .catch(err => {
//           res.json(err);
//         });
//         next()
//       }
//     })
//   } else {
//     res.status(400).json({
//       message: 'no token provided'
//     })
//   }
// };