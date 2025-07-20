
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
// Correct usage of dotenv.config
dotenv.config({ path: './.env' });

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://your-frontend-domain.vercel.app"] 
    : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

ConnectDB();



app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser())
app.use("/auth",UserRoutes)
app.use("/ayah",AyahRoutes)
app.use("/user",prayers)
app.use("/note",NotesRoute)
app.use("/reminder",ReminderRoute)
app.use("/tasbeeh",TasbeehRoute)
app.use("/date",DateRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Export the app for testing purpo
