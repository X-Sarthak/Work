// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 5173;

// // Middleware
// app.use(bodyParser.json());

// // Dummy data for demonstration (replace with actual database interactions)
// let admins = [];

// // API endpoints

// // Fetch all admins
// app.get('/api/admins', (req, res) => {
//     res.json(admins);
// });

// // Create a new admin
// app.post('/api/admins', (req, res) => {
//     const { userId, password } = req.body;
//     // For simplicity, we won't do validation here
//     const newAdmin = { userId, password, disabled: false };
//     admins.push(newAdmin);
//     res.status(201).json(newAdmin);
// });

// // Remove an admin by userId
// app.delete('/api/admins/:userId', (req, res) => {
//     const { userId } = req.params;
//     admins = admins.filter(admin => admin.userId !== userId);
//     res.sendStatus(204);
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
