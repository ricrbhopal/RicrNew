import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bgBannerRoutes from './src/router/heroRoutes.js';
import Affiliation from './src/router/affiliationRoutes.js';
import Maestor from './src/router/maestorRoutes.js';
import Expert from './src/router/expertRoutes.js';
import Celebrate from './src/router/celebrateRoutes.js';
import Adverstand from './src/router/adverstandRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use BgBanner routes
app.use('/hero', bgBannerRoutes);
app.use('/affiliations', Affiliation);
app.use('/maestor', Maestor);
app.use('/expert', Expert);
app.use('/celebrate', Celebrate);
app.use('/adverstand', Adverstand);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


