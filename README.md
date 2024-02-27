# MOUNIR SAID
# API Routes Documentation

To access the routes in Postman, you'll need to use the appropriate HTTP methods (GET, POST, PUT, DELETE) along with the correct URL endpoints. Here's how you can access the routes assuming you're running your server locally on port 3000:

## Users:

- **GET all users**: GET http://localhost:3000/api/users
- **GET a single user by ID**: GET http://localhost:3000/api/users/:id 
- **Create a new user**: POST http://localhost:3000/api/users/registerUser
- **Login user**: POST http://localhost:3000/api/users/login
- **Update a user by ID**: PUT http://localhost:3000/api/users/:id  
- **Delete a user by ID**: DELETE http://localhost:3000/api/users/:id 

## Products:

- **GET all products**: GET http://localhost:3000/api/products
- **GET a single product by ID**: GET http://localhost:3000/api/products/:id
- **Create a new product**: POST http://localhost:3000/api/products
- **Update a product by ID**: PUT http://localhost:3000/api/products/:id
- **Delete a product by ID**: DELETE http://localhost:3000/api/products/:id

## Orders:

- **GET all orders**: GET http://localhost:3000/api/orders
- **GET a single order by ID**: GET http://localhost:3000/api/orders/:id
- **Create a new order**: POST http://localhost:3000/api/orders
- **Update an order by ID**: PUT http://localhost:3000/api/orders/:id
- **Delete an order by ID**: DELETE http://localhost:3000/api/orders/:id

## Categories:

- **GET all categories**: GET http://localhost:3000/api/categories
- **GET a single category by ID**: GET http://localhost:3000/api/categories/:id
- **Create a new category**: POST http://localhost:3000/api/categories
- **Update a category by ID**: PUT http://localhost:3000/api/categories/:id
- **Delete a category by ID**: DELETE http://localhost:3000/api/categories/:id

## Cart:

- **GET cart items for a user**: GET http://localhost:3000/api/users/:userId/cart
- **Add an item to the cart**: POST http://localhost:3000/api/users/:userId/cart
- **Remove an item from the cart**: DELETE http://localhost:3000/api/users/:userId/cart/:itemId
- **Clear the cart**: DELETE http://localhost:3000/api/users/:userId/cart

Remember to replace :userId and :itemId with actual user and item IDs, respectively, as needed. Also, ensure that your server is running locally on port 3000.
