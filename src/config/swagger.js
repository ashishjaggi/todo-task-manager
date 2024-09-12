const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'To-Do task manager API',
    version: '1.0.0',
    description: 'API for managing a to-do task manager',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional
      },
    },
  },
  security: [
    {
      bearerAuth: [], // Global security
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User logged in successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
          },
        },
      },
    },
    '/auth/forgot-password': {
      post: {
        summary: 'Request a password reset link',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                },
                required: ['email'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset link sent successfully',
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
    '/taskList': {
      get: {
        summary: 'Retrieve all task list',
        security: [{ bearerAuth: [] }], // Apply security for this route
        responses: {
          200: {
            description: 'List of tasks retrieved successfully',
          },
        },
      },
    },
    '/tasks/{id}': {
      get: {
        summary: 'Get task details by task id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the task to retrieve',
            schema: {
              type: 'string',
            },
          },
        ],
        security: [{ bearerAuth: [] }], // Apply security for this route
        responses: {
          200: {
            description: 'Task details retrieved successfully',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
    },
    '/createTask': {
      post: {
        summary: 'Create a new task',
        security: [{ bearerAuth: [] }], // Apply security for this route
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  completed: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created successfully',
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
    '/updateTask/{id}': {
      put: {
        summary: 'Update task by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the task to update',
            schema: {
              type: 'string',
            },
          },
        ],
        security: [{ bearerAuth: [] }], // Apply security for this route
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  completed: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Task updated successfully',
          },
          400: {
            description: 'Invalid input',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
    },
    '/deleteTask/{id}': {
      delete: {
        summary: 'Delete a task by ID',
        security: [{ bearerAuth: [] }], // Requires JWT Token
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the task to delete',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
          },
          401: {
            description: 'Unauthorized, invalid token',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
    },
  },
};

module.exports = { swaggerDocument, swaggerUi };
