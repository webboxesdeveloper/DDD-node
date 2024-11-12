# Live Code Challenge

## Backend

This is a very basic project following a DDD (Domain Driven Design) structure in node.js.

### How to run

1. Clone repo and `cd` to its directory.

2. Run `docker-compose up` to launch the api http server running on port 3000.

3. For testing the only endpoint available you can run the following cURL command:  
`curl -X POST -H "Content-Type: application/json" -d '{"name": "product1", "price": 7.5}' http://localhost:3000/api/v1/products`

### To Evaluate

1. We will ask the candidate to implement a new feature or modify one of the existing features.
