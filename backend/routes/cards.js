const router = require('express').Router();
const {
  getCards, addCard, deleteCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');
const {
  validateCardPost,
  validateCardId,
} = require('../middlewares/celebrateErrors');

router.get('/api/', getCards);
router.post('/api/', validateCardPost, addCard);
router.delete('/api/:cardId', validateCardId, deleteCard);
router.put('/api/:cardId/likes', validateCardId, addLikeCard);
router.delete('/api/:cardId/likes', validateCardId, deleteLikeCard);

module.exports = router;
