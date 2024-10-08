import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './posts.js'
import cookieParser from "cookie-parser"
import session from "express-session"
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.use(session({
    secret: "61d333a8-6325-4506-96e7-a180035cc26f",
    resave: true,
    saveUninitialized: false,
}));

app.use('/images', express.static(path.join(__dirname, "public")));

app.use('/posts', postRoutes);
app.get("/", (req, res) => {
    res.send("hello")
});

const CONNECTION_URL = 'mongodb+srv://egesevinc:egesevinc123@cluster0.kmyoaxj.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
    .catch((error) => console.log(error.message))