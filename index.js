const express = require('express');
const { resolve } = require('path');

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3010;

app.use(express.static('static'));

const users = [
  { email: 'user@example.com', password: '$2b$10$...' } // hashed password
];

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return res.status(200).json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ error: 'Invalid password.' });
  }
});

app.get('/', (req, res) => {

  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
