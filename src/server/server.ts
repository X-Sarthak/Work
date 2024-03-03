import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 5173; // Choose any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock admin data (replace with your actual data source)
const admins: AdminData[] = [
  { userId: 'admin1', password: 'password1', disabled: false },
  { userId: 'admin2', password: 'password2', disabled: false }
];

// Login API endpoint
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;

  // Find admin
  const admin = admins.find(admin => admin.userId === userId && admin.password === password);

  if (admin) {
    if (admin.disabled) {
      res.status(403).json({ message: 'Admin account is disabled. Please contact the super admin.' });
    } else {
      res.status(200).json({ message: 'Login successful', admin });
    }
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
