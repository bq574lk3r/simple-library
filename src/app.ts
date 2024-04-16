import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV || ''}.env` });
import sequelize from './config/db'


const app = express();

const PORT = process.env.PORT;


import router from './routes/';

app.use(express.json());



app.use(router);



app.use(function onError(err: any, req: any, res: any, next: any) {
  console.error(err)
  res.status(500).end();
});

sequelize.authenticate()
  .then(() => {
    console.log('DB connected!')
  })
  .catch(err => console.log('error: ', err.message))

app.listen(PORT, () => {
  console.log(`Сервер запущен на 👉 http://localhost:${PORT}`);
});


export default app;