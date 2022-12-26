const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async(req, res, next) => {
  try {
    console.log("try");
    const token = req.cookies.accessToken;
    if(!token){
      return res.status(401).send({ errorMessage: "로그인이 필요합니다."});
    }
    const { id } = jwt.verify(token, "mysecretkey");

    const user = await User.findByPk(id);

    res.locals.user = user.id;
    console.log("111",user.id);
    next();
  } catch(err) {
    console.log("catch");
    return res.status(401).send({errorMessage: '로그인 후 이용 가능한 기능입니다.'});
  }
};