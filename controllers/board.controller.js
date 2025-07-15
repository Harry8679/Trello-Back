const Board = require('../models/board.model');
const User = require('../models/user.model');
const Column = require('../models/column.model');

exports.createBoard = async (req, res) => {
  const { title } = req.body;
  const ownerId = req.userId;
  const board = await Board.create({
    title,
    owner: ownerId,
    members: [{ user: ownerId, canCreateTasks: true }]
  });
  res.status(201).json(board);
};

exports.getBoards = async (req, res) => {
  const userId = req.userId;
  const boards = await Board.find({ 'members.user': userId });
  res.json(boards);
};

exports.inviteToBoard = async (req, res) => {
  const { id } = req.params;
  const { userEmail, canCreateTasks = false } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

  const board = await Board.findById(id);
  if (!board) return res.status(404).json({ message: 'Board introuvable' });

  // Vérifier qu’on n’invite pas deux fois :
  if (board.members.some(m => m.user.equals(user._id))) {
    return res.status(400).json({ message: 'Déjà membre' });
  }

  board.members.push({ user: user._id, canCreateTasks });
  await board.save();
  res.json(board);
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Projet introuvable' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// exports.getBoardColumns = async (req, res) => {
//   try {
//     const columns = await Column.find({ boardId: req.params.id }).sort({ _id: 1 });
//     res.json(columns);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

// GET /api/boards/:id/columns → récupérer les colonnes d’un board
exports.getBoardColumns = async (req, res) => {
  try {
    const columns = await Column.find({ boardId: req.params.id }).sort({ _id: 1 });
    res.json(columns);
  } catch (err) {
    console.error('Erreur de récupération des colonnes :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST /api/boards/:id/columns → ajouter des colonnes à un board
exports.addBoardColumns = async (req, res) => {
  try {
    console.log('📥 BODY reçu dans addBoardColumns:', req.body);
    const { columns } = req.body;
    const boardId = req.params.id;

    if (!Array.isArray(columns)) {
      return res.status(400).json({ message: 'Colonnes invalides' });
    }

    const saved = await Column.insertMany(
      columns.map(c => ({ title: c.title, boardId }))
    );

    res.status(201).json(saved);
  } catch (err) {
    console.error('Erreur création colonnes :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};