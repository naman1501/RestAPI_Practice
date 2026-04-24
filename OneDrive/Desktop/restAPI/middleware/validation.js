// Exercise 2: Input validation middleware
const validateYear = (req, res, next) => {
  const { year } = req.body;

  if (year !== undefined) {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum)) {
      return res.status(400).json({ error: 'Year must be a valid number' });
    }
    if (yearNum < 1000 || yearNum > new Date().getFullYear() + 10) {
      return res.status(400).json({ error: 'Year must be between 1000 and ' + (new Date().getFullYear() + 10) });
    }
    req.body.year = yearNum; // Ensure it's stored as a number
  }

  next();
};

const validateBookData = (req, res, next) => {
  const { title, author, year } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (!author || typeof author !== 'string' || author.trim().length === 0) {
    return res.status(400).json({ error: 'Author is required and must be a non-empty string' });
  }

  // Year validation is handled by validateYear middleware

  next();
};

const validateAuthorData = (req, res, next) => {
  const { name, birthYear, nationality } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  if (birthYear !== undefined) {
    const birthYearNum = parseInt(birthYear, 10);
    if (isNaN(birthYearNum)) {
      return res.status(400).json({ error: 'Birth year must be a valid number' });
    }
    if (birthYearNum < 1000 || birthYearNum > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Birth year must be between 1000 and current year' });
    }
    req.body.birthYear = birthYearNum;
  }

  if (!nationality || typeof nationality !== 'string' || nationality.trim().length === 0) {
    return res.status(400).json({ error: 'Nationality is required and must be a non-empty string' });
  }

  next();
};

module.exports = {
  validateYear,
  validateBookData,
  validateAuthorData
};