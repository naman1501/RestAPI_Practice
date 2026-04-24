const express = require('express');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const validationMiddleware = require('./middleware/validation');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
  { id: 6, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997 },
  { id: 7, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
  { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
  { id: 9, title: 'Dune', author: 'Frank Herbert', year: 1965 },
  { id: 10, title: 'Neuromancer', author: 'William Gibson', year: 1984 }
];

let authors = [
  { id: 1, name: 'F. Scott Fitzgerald', birthYear: 1896, nationality: 'American' },
  { id: 2, name: 'Harper Lee', birthYear: 1926, nationality: 'American' },
  { id: 3, name: 'George Orwell', birthYear: 1903, nationality: 'British' },
  { id: 4, name: 'Jane Austen', birthYear: 1775, nationality: 'British' },
  { id: 5, name: 'J.D. Salinger', birthYear: 1919, nationality: 'American' },
  { id: 6, name: 'J.K. Rowling', birthYear: 1965, nationality: 'British' },
  { id: 7, name: 'J.R.R. Tolkien', birthYear: 1892, nationality: 'British' },
  { id: 8, name: 'Frank Herbert', birthYear: 1920, nationality: 'American' },
  { id: 9, name: 'William Gibson', birthYear: 1948, nationality: 'American' }
];

// Make data accessible to routes
app.locals.books = books;
app.locals.authors = authors;

// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the REST API Practice' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;