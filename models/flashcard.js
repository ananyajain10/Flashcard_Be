const db = require('../config/database');

class Flashcard {
  static async getAll() {
    try {
      console.log('Executing getAll query');
      const [rows] = await db.query('SELECT * FROM flashcards');
      console.log(`Retrieved ${rows.length} flashcards`);
      return rows;
    } catch (error) {
      console.error('Error in Flashcard.getAll:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      console.log(`Executing getById query for id: ${id}`);
      const [rows] = await db.query('SELECT * FROM flashcards WHERE id = ?', [id]);
      console.log('getById result:', rows[0]);
      return rows[0];
    } catch (error) {
      console.error('Error in Flashcard.getById:', error);
      throw error;
    }
  }

  static async create(flashcard) {
    try {
      console.log('Executing create query with data:', flashcard);
      const { question, answer } = flashcard;
      const [result] = await db.query(
        'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
        [question, answer]
      );
      console.log('Create result:', result);
      return { id: result.insertId, question, answer };
    } catch (error) {
      console.error('Error in Flashcard.create:', error);
      throw error;
    }
  }

  static async update(id, flashcard) {
    try {
      console.log(`Executing update query for id: ${id} with data:`, flashcard);
      const { question, answer } = flashcard;
      const [result] = await db.query(
        'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
        [question, answer, id]
      );
      console.log('Update result:', result);
      if (result.affectedRows === 0) {
        console.log(`No flashcard found with id: ${id}`);
        return null;
      }
      return this.getById(id);
    } catch (error) {
      console.error('Error in Flashcard.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      console.log(`Executing delete query for id: ${id}`);
      const [result] = await db.query('DELETE FROM flashcards WHERE id = ?', [id]);
      console.log('Delete result:', result);
      return { id };
    } catch (error) {
      console.error('Error in Flashcard.delete:', error);
      throw error;
    }
  }
}

module.exports = Flashcard;