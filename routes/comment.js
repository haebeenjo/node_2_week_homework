const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const { comment } = require('../models');
const authMiddleWare = require('../middlewares/auth-middleware');

const app = express();
app.use(cookieParser());

// 댓글 목록 조회
router.get('/comments/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const comments = await Comment.findAll({
    where: { post_id },
    include : [
        { model : User,
          attributes: [ 'post_id','comment','owner_id']
        }
    ]
  })
  res.json({ comments });
});

// 댓글 생성
router.post('/comments/:post_id', authMiddleWare, async (req, res) => {
    try{
        const { post_id } = req.params;
        const { content } = req.body;
        const { user_id } = res.locals.user;
        const { nickname } = res.locals.user;

        if (!content) {
            res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
            return;
        }
        await comment.create({post_id, user_id, nickname, content});
        res.json({ message: '댓글을 생성하였습니다.' });
    } catch {
        res.status(400).json({errorMessage:"댓글 작성에 실패하였습니다."})
    }
  
});

// 댓글 수정
router.put('/comments/:comment_id', authMiddleWare, async (req, res) => {
  try{
    const { comment_id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
        return;
    }
    const data = await comment.findOne({ where: { id: comment_id } });
    if (data === null) {
        res.status(400).json({ message: '댓글 조회에 실패하였습니다.' });
        return;
    }
    await comment.update({ content: content }, { where: { id: comment_id } });
    res.status(200).json({ message: '댓글을 수정하였습니다.' });
    } catch {
        res.status(400).json({errorMessage:"댓글 수정에 실패하였습니다."})
    }    
});

// 댓글 삭제
router.delete('/comments/:_comment_id', authMiddleWare, async (req, res) => {
  try{
    const { comment_id } = req.params;
    const deleteComment = await comment.findOne({ where: { id: comment_id } });

    if (deleteComment) {
        await comment.destroy({ where: { id: comment_id } });
    }
    res.status(200).json({ message: '댓글을 삭제하였습니다.' });
  } catch {
    res.status(400).json({errorMessage:"댓글 삭제에 실패하였습니다."});
  }
});

module.exports = router;