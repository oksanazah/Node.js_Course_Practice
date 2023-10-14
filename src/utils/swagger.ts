import swaggerJsDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'NodeJS project API',
			version: '1.0.0',
		},
	},
	apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
