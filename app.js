const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.route');
const boardRoutes = require('./routes/board.route');
const columnRoutes = require('./routes/column.route');
const cardRoutes = require('./routes/card.route');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/cards', cardRoutes);

module.exports = app;