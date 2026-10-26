const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pharmacy API',
      version: '1.0.0',
      description: 'API para el sistema de gestión de farmacia'
    }
  },
  apis: [path.join(__dirname, '../routes/*.js').replace(/\\/g, '/')]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;