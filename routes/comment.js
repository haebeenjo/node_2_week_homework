const express = require('express');
const cookieParser = require('cookie-parser');

const { User, Post, Comment, Sequelize } = require('../models');
const authMiddleWare = require('../middlewares/auth-middleware');

const app = express();
const router = express.Router();
app.use(cookieParser());

// 댓글 생성
router.post('/comments/:post_id', authMiddleWare, async (req,res) => {
  try{
      const { post_id } = req.params;
      const { content } = req.body;
      const owner_id  = res.locals.user;
      // post_id = Number(post_id);

      if (!content) {
          res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
          return;
      }
      await Comment.create({ post_id, owner_id, content })
      .then((result) =>{
        console.log(result);
        res.status(200).json({ message: "댓글 작성 성공" })
      })
      .catch((err)=> {
          console.log("error =",err);
          res.status(500).json({ message: "댓글 작성 실패 "})
      })
  } catch{(err)=> {
      console.log("전체 오류 =",err);
      res.status(400).json({errorMessage:"댓글 작성에 실패하였습니다."})
    }}
});

// 댓글 목록 조회
router.get('/comments/:post_id', async (req,res) => {
  try {
    const { post_id } = req.params;
    await Comment.findAll({
      where: { post_id },
      attributes: ['id', 'content', 'createdAt', 'updatedAt'],
      order: [['id', 'DESC']],
    })
    .then((comments) => {
      console.log(comments);
      res.status(200).json({comments})
    })
    .catch((err)=> {
        console.log("error =",err)
        res.status(500).json({ message: "댓글 조회 실패"})
    })
  } catch (err){
      console.log(err)
      res.status(400).json({ errorMessage: "댓글 조회에 실패하였습니다."})
  }
});

// 댓글 수정
router.put('/comments/:comment_id', authMiddleWare, async (req,res) => {
  try{
    const owner_id = res.locals.user;
    const { comment_id: id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
        return;
    }
    const data = await Comment.findOne({ where: {id:id, owner_id:owner_id} })
    if (data === null) {
        res.status(400).json({ message: '댓글 조회에 실패하였습니다.' });
        return;
    }
    await Comment.update({ content: content }, { where: { id:id, owner_id:owner_id } })
    .then((content) => {
        console.log(content);
        res.status(200).json({ message: '댓글을 수정하였습니다.' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "댓글 수정 실패"});
    })
    
    } catch(err) {
        console.log(err);
        res.status(400).json({errorMessage:"댓글 수정에 실패하였습니다."})
    }    
});

// 댓글 삭제
router.delete('/comments/:comment_id', authMiddleWare, async (req, res) => {
  try{
    const owner_id = res.locals.user;
    const { comment_id : id } = req.params;
    await Comment.findOne({ where: { id:id, owner_id: owner_id } });
    await Comment.destroy({ where: { id: id, owner_id: owner_id } });
    res.status(200).json({ message: '댓글을 삭제하였습니다.' });
  } catch(err) {
    console.log('에러메시지',err)
    res.status(400).json({errorMessage:"댓글 삭제에 실패하였습니다."});
  }
});

module.exports = router;