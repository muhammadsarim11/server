
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import prayers from './routes/Prayer.route.js'
import ConnectDB from './config/db.connect.js';
import UserRoutes from "./routes/User.route.js"
import AyahRoutes from "./routes/Ayah.route.js"
import NotesRoute from './routes/Notes.route.js'
import ReminderRoute from './routes/Reminder.route.js';
import TasbeehRoute from './routes/Tasbeeh.route.js'
import DateRoute from './routes/Date.route.js'
import cors from 'cors'

// Load environment variables
  dotenv.config();

const app = express();

// Debug environment variables
console.log('Environment Variables Check:', {
  hasMongoUri: !!process.env.MONGO_URI,
  hasJwtSecret: !!process.env.JWT_SECRET,

});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://your-frontend-domain.vercel.app"] 
    : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Connect to database
ConnectDB();

// Routes
app.use("/auth", UserRoutes);
app.use("/ayah", AyahRoutes);
app.use("/user", prayers);
app.use("/note", NotesRoute);
app.use("/reminder", ReminderRoute);
app.use("/tasbeeh", TasbeehRoute);
app.use("/date", DateRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
  
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
export default app;
