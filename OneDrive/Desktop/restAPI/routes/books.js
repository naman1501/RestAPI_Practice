const express = require('express');
const router = express.Router();
const { validateYear, validateBookData } = require('../middleware/validation');

// Helper function to get next ID
const getNextId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

// Exercise 1 & 3 & 5: GET all books with filtering, pagination, and search
router.get('/', (req, res) => {
  let { books } = req.app.locals;
  const { author, year, page = 1, limit = 10, search } = req.query;

  // Exercise 1: Filter by author or year
  if (author) {
    books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  if (year) {
    const yearNum = parseInt(year, 10);
    if (!isNaN(yearNum)) {
      books = books.filter(book => book.year === yearNum);
    }
  }

  // Exercise 5: Search by title
  if (search) {
    books = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
  }

  // Exercise 3: Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedBooks = books.slice(startIndex, endIndex);

  const totalBooks = books.length;
  const totalPages = Math.ceil(totalBooks / limitNum);

  res.json({
    books: paginatedBooks,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalBooks,
      limit: limitNum,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  });
});

// GET single book
router.get('/:id', (req, res) => {
  const { books } = req.app.locals;
  const id = parseInt(req.params.id, 10);

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

// POST create book
router.post('/', validateBookData, validateYear, (req, res) => {
  const { books } = req.app.locals;
  const { title, author, year } = req.body;

  const newBook = {
    id: getNextId(books),
    title: title.trim(),
    author: author.trim(),
    year
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', validateBookData, validateYear, (req, res) => {
  const { books } = req.app.locals;
  const id = parseInt(req.params.id, 10);
  const { title, author, year } = req.body;

  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim(),
    year
  };

  res.json(books[bookIndex]);
});

// PATCH partial update book
router.patch('/:id', validateYear, (req, res) => {
  const { books } = req.app.locals;
  const id = parseInt(req.params.id, 10);
  const updates = req.body;

  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Validate title if provided
  if (updates.title !== undefined) {
    if (typeof updates.title !== 'string' || updates.title.trim().length === 0) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    updates.title = updates.title.trim();
  }

  // Validate author if provided
  if (updates.author !== undefined) {
    if (typeof updates.author !== 'string' || updates.author.trim().length === 0) {
      return res.status(400).json({ error: 'Author must be a non-empty string' });
    }
    updates.author = updates.author.trim();
  }

  books[bookIndex] = { ...books[bookIndex], ...updates };
  res.json(books[bookIndex]);
});

// DELETE book
router.delete('/:id', (req, res) => {
  const { books } = req.app.locals;
  const id = parseInt(req.params.id, 10);

  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deletedBook });
});

module.exports = router;