import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
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

const swaggerUiOpts = {
  customSiteTitle: 'LIBRARY',
  customCss: `.swagger-ui .opblock.opblock-post {
                background:#d1e0ff;
              }
              .swagger-ui .opblock .opblock-section-header{
                background:#f6f9ff7a;
              }
              .swagger-ui .scheme-container{
                background: center/cover no-repeat url(https://rg.ru/uploads/images/177/12/83/iStock-9491180681000.jpg) !important;
              }`,
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    operationsSorter: 'path',
    syntaxHighlight: {
      activate: true,
      theme: 'nord'
    },
    persistAuthorization: true
  }
}

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUiOpts };