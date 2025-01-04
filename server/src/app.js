import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {sequelize} from './database.js'
import  userRoute from './routes/userRoutes.js'
import roomRoute from './routes/roomRoutes.js'
import studentRoute from './routes/studentRoutes.js'
import adminRoute from './routes/adminRoutes.js'
import messRoute from './routes/messRoute.js'
import reviewRoute from './routes/feedbackRoutes.js';
import visitorRoute from './routes/visitorRoutes.js'
import Student from "./model/StudentModel.js";

dotenv.config();

const app = express();
// (async () => {
//     try {
//         // Authenticate the database connection
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');

//         // Sync all models to the database
//         await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables (use with caution!)
//         console.log('Database synced successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database or sync:', error);
//     }
// })();
(
    async () => {
        try {
            await sequelize.sync({force: true});
            console.log('Admin table created successfully.');
        }catch (error) {
            console.error('Unable to create Admin table:', error);
        }
    }
)();

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
app.use('/api/room',roomRoute);
app.use('/api/student',studentRoute);
app.use('/api/admin',adminRoute);
app.use('/api/mess',messRoute);
app.use('/api/review',reviewRoute);
app.use('/api/visitors',visitorRoute);
app.listen(3000, () => {
    console.log('Server is running on port 3000');


});