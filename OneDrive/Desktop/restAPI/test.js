// test.js - Simple test script to verify API endpoints
const http = require('http');

const testEndpoint = (path, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  console.log('Testing REST API endpoints...\n');

  try {
    // Test 1: GET all books
    console.log('1. Testing GET /api/books');
    const booksResponse = await testEndpoint('/api/books');
    console.log(`Status: ${booksResponse.status}`);
    console.log(`Books returned: ${booksResponse.data.books ? booksResponse.data.books.length : 0}`);
    console.log(`Pagination info: ${booksResponse.data.pagination ? 'Present' : 'Missing'}\n`);

    // Test 2: Filter by author (Exercise 1)
    console.log('2. Testing GET /api/books?author=tolkien (Exercise 1)');
    const filteredResponse = await testEndpoint('/api/books?author=tolkien');
    console.log(`Status: ${filteredResponse.status}`);
    console.log(`Books found: ${filteredResponse.data.books ? filteredResponse.data.books.length : 0}\n`);

    // Test 3: Pagination (Exercise 3)
    console.log('3. Testing GET /api/books?page=1&limit=3 (Exercise 3)');
    const paginatedResponse = await testEndpoint('/api/books?page=1&limit=3');
    console.log(`Status: ${paginatedResponse.status}`);
    console.log(`Books on page 1: ${paginatedResponse.data.books ? paginatedResponse.data.books.length : 0}`);
    console.log(`Total books: ${paginatedResponse.data.pagination ? paginatedResponse.data.pagination.totalBooks : 'N/A'}\n`);

    // Test 4: Search by title (Exercise 5)
    console.log('4. Testing GET /api/books?search=harry (Exercise 5)');
    const searchResponse = await testEndpoint('/api/books?search=harry');
    console.log(`Status: ${searchResponse.status}`);
    console.log(`Books found: ${searchResponse.data.books ? searchResponse.data.books.length : 0}\n`);

    // Test 5: GET all authors (Exercise 4)
    console.log('5. Testing GET /api/authors (Exercise 4)');
    const authorsResponse = await testEndpoint('/api/authors');
    console.log(`Status: ${authorsResponse.status}`);
    console.log(`Authors returned: ${Array.isArray(authorsResponse.data) ? authorsResponse.data.length : 0}\n`);

    // Test 6: Create new book with validation (Exercise 2)
    console.log('6. Testing POST /api/books with validation (Exercise 2)');
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2023
    };
    const createResponse = await testEndpoint('/api/books', 'POST', newBook);
    console.log(`Status: ${createResponse.status}`);
    if (createResponse.status === 201) {
      console.log('Book created successfully\n');
    } else {
      console.log(`Error: ${createResponse.data.error}\n`);
    }

    // Test 7: Test invalid year validation
    console.log('7. Testing validation with invalid year');
    const invalidBook = {
      title: 'Invalid Book',
      author: 'Test Author',
      year: 'invalid'
    };
    const invalidResponse = await testEndpoint('/api/books', 'POST', invalidBook);
    console.log(`Status: ${invalidResponse.status}`);
    console.log(`Error: ${invalidResponse.data.error}\n`);

    console.log('All tests completed!');

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

runTests();