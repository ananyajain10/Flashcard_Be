const Flashcard = require('../models/flashcard');

exports.getAllFlashcards = async (req, res) => {
  try {
    console.log('Fetching all flashcards');
    const flashcards = await Flashcard.getAll();
    console.log(`Retrieved ${flashcards.length} flashcards`);
    res.json(flashcards);
  } catch (error) {
    console.error('Error in getAllFlashcards:', error);
    res.status(500).json({ message: 'Error fetching flashcards', error: error.message });
  }
};

exports.createFlashcard = async (req, res) => {
  try {
    console.log('Creating new flashcard:', req.body);
    const flashcard = await Flashcard.create(req.body);
    console.log('Created flashcard:', flashcard);
    res.status(201).json(flashcard);
  } catch (error) {
    console.error('Error in createFlashcard:', error);
    res.status(500).json({ message: 'Error creating flashcard', error: error.message });
  }
};

exports.updateFlashcard = async (req, res) => {
  try {
    console.log(`Updating flashcard with id: ${req.params.id}`, req.body);
    const flashcard = await Flashcard.update(req.params.id, req.body);
    if (flashcard) {
      console.log('Updated flashcard:', flashcard);
      res.json(flashcard);
    } else {
      console.log(`Flashcard with id ${req.params.id} not found`);
      res.status(404).json({ message: 'Flashcard not found' });
    }
  } catch (error) {
    console.error('Error in updateFlashcard:', error);
    res.status(500).json({ message: 'Error updating flashcard', error: error.message, stack: error.stack });
  }
};

exports.deleteFlashcard = async (req, res) => {
  try {
    console.log(`Deleting flashcard with id: ${req.params.id}`);
    await Flashcard.delete(req.params.id);
    console.log(`Flashcard with id ${req.params.id} deleted successfully`);
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Error in deleteFlashcard:', error);
    res.status(500).json({ message: 'Error deleting flashcard', error: error.message });
  }
};