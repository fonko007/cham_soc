const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection configuration
const dbConfig = {
  host: 'localhost:3306',
  user: 'css72456_snowy',
  password: 'Lamvannhut123@',
  database: 'css72456_chamsoc'
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      // Retry connection after 2 seconds
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log('Connected to MySQL');
  });

  db.on('error', err => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || 
        err.code === 'ECONNRESET' || 
        err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      console.log('Lost connection to MySQL. Reconnecting...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

// Initial connection
handleDisconnect();

// Wrapper function for database queries
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

// Endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM users');
    res.send(results);
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

// Endpoint to delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM users WHERE id = ?', [id]);
    res.send({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

app.get('/adminbooked', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM bookings');
    res.send(results);
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const { fullname, email, sdt, address, date, time, ghichu, status } = req.body;
    await executeQuery(
      'INSERT INTO bookings (fullname, email, sdt, address, date, time, ghichu, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [fullname, email, sdt, address, date, time, ghichu, status]
    );
    res.status(201).send('Booking created');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/booked', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send('Email is required');
    }
    const results = await executeQuery('SELECT * FROM bookings WHERE email = ?', [email]);
    res.json(results);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.delete('/booking/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM bookings WHERE id = ?', [id]);
    res.send({ success: true, message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

app.get('/account', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send('Email is required');
    }
    const results = await executeQuery(
      'SELECT username, email, role FROM users WHERE email = ?',
      [email]
    );
    res.json(results[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);
    
    if (results.length === 0) {
      return res.status(401).send({ success: false, message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = password === user.password;
    
    if (!isPasswordValid) {
      return res.status(401).send({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'ihwhyeiwij', { expiresIn: '1h' });
    res.send({ success: true, token });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, displayname, email, password, role } = req.body;

    // Check if email or username already exists
    const existingUser = await executeQuery(
      'SELECT email FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(409).send({ success: false, message: 'Email already exists' });
    }

    // Register new user
    await executeQuery(
      'INSERT INTO users (username, displayname, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [username, displayname, email, password, role]
    );

    res.send({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send({ success: false, message: 'Internal server error' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
