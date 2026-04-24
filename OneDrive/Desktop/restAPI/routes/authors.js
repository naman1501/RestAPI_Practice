const express = require('express');
const router = express.Router();
const { validateAuthorData } = require('../middleware/validation');

// Exercise 4: Full CRUD operations for authors

// Helper function to get next ID
const getNextId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

// GET all authors
router.get('/', (req, res) => {
  const { authors } = req.app.locals;
  res.json(authors);
});

// GET single author
router.get('/:id', (req, res) => {
  const { authors } = req.app.locals;
  const id = parseInt(req.params.id, 10);

  const author = authors.find(a => a.id === id);
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json(author);
});

// POST create author
router.post('/', validateAuthorData, (req, res) => {
  const { authors } = req.app.locals;
  const { name, birthYear, nationality } = req.body;

  const newAuthor = {
    id: getNextId(authors),
    name: name.trim(),
    birthYear,
    nationality: nationality.trim()
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// PUT update author
router.put('/:id', validateAuthorData, (req, res) => {
  const { authors } = req.app.locals;
  const id = parseInt(req.params.id, 10);
  const { name, birthYear, nationality } = req.body;

  const authorIndex = authors.findIndex(a => a.id === id);
  if (authorIndex === -1) {
    return res.status(404).json({ error: 'Author not found' });
  }

  authors[authorIndex] = {
    ...authors[authorIndex],
    name: name.trim(),
    birthYear,
    nationality: nationality.trim()
  };

  res.json(authors[authorIndex]);
});

// PATCH partial update author
router.patch('/:id', (req, res) => {
  const { authors } = req.app.locals;
  const id = parseInt(req.params.id, 10);
  const updates = req.body;

  const authorIndex = authors.findIndex(a => a.id === id);
  if (authorIndex === -1) {
    return res.status(404).json({ error: 'Author not found' });
  }

  // Validate name if provided
  if (updates.name !== undefined) {
    if (typeof updates.name !== 'string' || updates.name.trim().length === 0) {
      return res.status(400).json({ error: 'Name must be a non-empty string' });
    }
    updates.name = updates.name.trim();
  }

  // Validate birthYear if provided
  if (updates.birthYear !== undefined) {
    const birthYearNum = parseInt(updates.birthYear, 10);
    if (isNaN(birthYearNum)) {
      return res.status(400).json({ error: 'Birth year must be a valid number' });
    }
    if (birthYearNum < 1000 || birthYearNum > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Birth year must be between 1000 and current year' });
    }
    updates.birthYear = birthYearNum;
  }

  // Validate nationality if provided
  if (updates.nationality !== undefined) {
    if (typeof updates.nationality !== 'string' || updates.nationality.trim().length === 0) {
      return res.status(400).json({ error: 'Nationality must be a non-empty string' });
    }
    updates.nationality = updates.nationality.trim();
  }

  authors[authorIndex] = { ...authors[authorIndex], ...updates };
  res.json(authors[authorIndex]);
});

// DELETE author
router.delete('/:id', (req, res) => {
  const { authors } = req.app.locals;
  const id = parseInt(req.params.id, 10);

  const authorIndex = authors.findIndex(a => a.id === id);
  if (authorIndex === -1) {
    return res.status(404).json({ error: 'Author not found' });
  }

  const deletedAuthor = authors.splice(authorIndex, 1)[0];
  res.json({ message: 'Author deleted successfully', author: deletedAuthor });
});

module.exports = router;