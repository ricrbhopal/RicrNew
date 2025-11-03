import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import Admin from './src/router/adminRoutes.js'
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin:
    `${process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL
      : 'http://localhost:5173'
    }`,
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/admin', Admin);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


