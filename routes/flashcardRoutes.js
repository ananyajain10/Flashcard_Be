const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

router.get('/flashcards', flashcardController.getAllFlashcards);
router.post('/flashcards', flashcardController.createFlashcard);
router.put('/flashcards/:id', flashcardController.updateFlashcard);
router.delete('/flashcards/:id', flashcardController.deleteFlashcard);

module.exports = router;