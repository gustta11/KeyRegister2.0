
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
const router = express.Router();

// Rota de cadastro
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });


  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) return res.status(400).json({ message: 'Usuário já existe' });


    const hashedPassword = bcrypt.hashSync(password, 10);
    

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    });
  });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });


  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(400).json({ message: 'Usuário não encontrado' });

    const user = result[0];
    

    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Senha incorreta' });


    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  });
});

module.exports = router;
