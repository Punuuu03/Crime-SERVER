import express from 'express';
import connectDB from './config/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' assert { type: 'json' };
import dotenv from 'dotenv';
import cors from 'cors';
// Import routes directly (not dynamically)
import loginRoute from './routes/loginRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api', loginRoute); // This will now work properly since it's a statically imported module.

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`API documentation available at: http://localhost:${PORT}/api-docs`);
  console.log(`Server running at: http://localhost:${PORT}`);
});
