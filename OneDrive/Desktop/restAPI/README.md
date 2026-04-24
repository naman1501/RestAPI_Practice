# REST API Practice Exercises

This is a Node.js/Express REST API implementation for practicing various REST API concepts.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will run on http://localhost:3000

## API Endpoints

### Books

#### GET /api/books
Get all books with optional filtering, pagination, and search.

**Query Parameters:**
- `author`: Filter by author name (partial match, case-insensitive)
- `year`: Filter by exact year
- `page`: Page number for pagination (default: 1)
- `limit`: Number of items per page (default: 10)
- `search`: Search in book titles (partial match, case-insensitive)

**Examples:**
- Get all books: `GET /api/books`
- Filter by author: `GET /api/books?author=tolkien`
- Filter by year: `GET /api/books?year=1954`
- Pagination: `GET /api/books?page=2&limit=5`
- Search by title: `GET /api/books?search=harry`

#### GET /api/books/:id
Get a single book by ID.

#### POST /api/books
Create a new book.

**Request Body:**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "year": 2023
}
```

#### PUT /api/books/:id
Update a book completely.

#### PATCH /api/books/:id
Update a book partially.

#### DELETE /api/books/:id
Delete a book.

### Authors

#### GET /api/authors
Get all authors.

#### GET /api/authors/:id
Get a single author by ID.

#### POST /api/authors
Create a new author.

**Request Body:**
```json
{
  "name": "Author Name",
  "birthYear": 1980,
  "nationality": "American"
}
```

#### PUT /api/authors/:id
Update an author completely.

#### PATCH /api/authors/:id
Update an author partially.

#### DELETE /api/authors/:id
Delete an author.

## Exercises Implemented

### Exercise 1: Query Parameter Filtering
- Added filtering by `author` and `year` to the GET /api/books endpoint
- Author filtering is case-insensitive and supports partial matches
- Year filtering requires exact match

### Exercise 2: Input Validation Middleware
- Created validation middleware in `middleware/validation.js`
- Validates that year is a number and within reasonable range (1000 to current year + 10)
- Validates required fields and data types for books and authors
- Applied to POST and PUT endpoints

### Exercise 3: Pagination
- Added pagination to GET /api/books endpoint
- Uses `page` and `limit` query parameters
- Returns pagination metadata including total pages, current page, etc.

### Exercise 4: Authors Resource
- Created full CRUD operations for authors
- Includes GET, POST, PUT, PATCH, DELETE endpoints
- Proper validation and error handling

### Exercise 5: Search Endpoint
- Added search functionality to GET /api/books
- Uses `search` query parameter to search in book titles
- Case-insensitive partial matching

## Testing the API

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)
- Browser for GET requests

### Example curl commands:

```bash
# Get all books
curl http://localhost:3000/api/books

# Get books by author
curl "http://localhost:3000/api/books?author=tolkien"

# Get books with pagination
curl "http://localhost:3000/api/books?page=1&limit=5"

# Search books by title
curl "http://localhost:3000/api/books?search=harry"

# Create a new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"New Author","year":2023}'

# Get all authors
curl http://localhost:3000/api/authors

# Create a new author
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"New Author","birthYear":1980,"nationality":"American"}'
```