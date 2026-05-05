import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import Admin from './src/router/adminRoutes.js'
import Auth from './src/router/authRoutes.js'
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

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/admin', Admin);
app.use('/auth', Auth);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


