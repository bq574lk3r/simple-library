import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'library API',
      version: '1.0.0',
      description: 'API documentation'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization'
        }
      }
    }
  },
  apis: ['./documentation/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

export = swaggerSpec;