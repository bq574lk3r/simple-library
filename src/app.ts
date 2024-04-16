import express from 'express';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerSpec';

dotenv.config({ path: `${process.env.NODE_ENV || ''}.env` });
import sequelize from './config/db'


const app = express();

const PORT = process.env.PORT;


import router from './routes/';

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  console.log(`👇Сервер запущен на \nhttp://localhost:${PORT} 
  \n👇Документация:  \nhttp://localhost:${PORT}/api-docs `);
});


export default app;