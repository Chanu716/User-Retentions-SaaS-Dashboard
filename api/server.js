const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Enable CORS for all origins (you can restrict this in production)
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Access at: http://localhost:${PORT}`);
});
