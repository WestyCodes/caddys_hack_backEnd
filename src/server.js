import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Dont forget to import the routers from routes.
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import clubRouter from './routes/golfclub.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Here be the routing.
// app.use('/users', userRouter)
// app.use('/', authRouter);
app.use('/clubs', clubRouter);
app.use('/users', userRouter);
app.use('/', authRouter);

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        data: {
            resource: 'Not found',
        },
    });
});

export default app;
