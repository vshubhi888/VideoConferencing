const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const createAdminUser = require('./util/create_admin');


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });


// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('driverLogin', (driverId) => {
//     drivers[driverId] = socket.id;
//     io.emit('driverList', Object.keys(drivers));
//     console.log(`Driver ${driverId} logged in with socket ${socket.id}`);
//   });

//   socket.on('disconnect', () => {
//     for (const [driverId, id] of Object.entries(drivers)) {
//       if (id === socket.id) {
//         delete drivers[driverId];
//         break;
//       }
//     }
//     io.emit('driverList', Object.keys(drivers));
//     console.log('A user disconnected:', socket.id);
//   });
// });

app.set('io', io);

app.use('/api/users', userRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/teamly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  await createAdminUser();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // <-- FIXED: use server.listen
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});