import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRoute from './routes/userRoutes.js'
import roomRoute from './routes/roomRoutes.js'
import maintainanceRoutes from './routes/maintainanceRoute.js'
import bookingRoute from './routes/bookingRoutes.js'
import notificationRoute from './routes/notificationRoutes.js'
import attendanceRoute from './routes/attendanceRoutes.js'
import paymentRoute from './routes/paymentRoutes.js'
import reportRoute from './routes/reportRoutes.js';
import studentRoute from './routes/studentRoute.js';
import cors from 'cors';
import complaintRoute from './routes/complaintRoutes.js';
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*", // Frontend origin
        methods: ["GET", "POST" , "DELETE", "PATCH", "OPTIONS"], 
    })
);


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is running",
        name: "hostel management system"
    })
})

app.use('/api/auth', userRoute);
app.use('/api/students',studentRoute );
app.use('/api/room', roomRoute);
app.use('/api/maintainance', maintainanceRoutes);
app.use('/api/booking', bookingRoute);
app.use('/api/complaint', complaintRoute);
app.use('/api/sendnotification', notificationRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/report', reportRoute);
// app.use('/api/review', reviewRoute);
app.listen(3000, () => {
    console.log('Server is running on port 3000');


});