import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Dont forget to import the routers from routes.
import userRouter from './routes/user.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Here be the routing.
// app.use('/users', userRouter)
// app.use('/', authRouter);
app.use('/users', userRouter);

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        data: {
            resource: 'Not found',
        },
    });
});

export default app;
