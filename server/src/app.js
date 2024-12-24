import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {sequelize} from './database.js'
import  userRoute from './routes/userRoutes.js'

dotenv.config();

const app = express();
(async () => {
    try {
        // Authenticate the database connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models to the database
        await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables (use with caution!)
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database or sync:', error);
    }
})();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) =>{
    res.status(200).json({
        message: "Server is running",
        name:"hostel management system"
    })
})

app.use('/api/auth',userRoute);
app.listen(3000, () => {
    console.log('Server is running on port 3000');


});