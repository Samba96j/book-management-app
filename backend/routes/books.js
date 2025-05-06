const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// Créer un livre
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear, createdBy: req.user.id });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lire tous les livres
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mettre à jour un livre
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title, author, description, publishedYear },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Supprimer un livre
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;