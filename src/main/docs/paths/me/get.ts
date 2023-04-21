export const get = {
  tags: ['Author'],
  summary: 'Este endpoint lista único author',
  description: 'Esse endpoint necessita de autenticação',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/author',
          },
        },
      },
    },
    400: {
      $ref: '#/components/badRequest',
    },
    404: {
      $ref: '#/components/notFound',
    },
    401: {
      $ref: '#/components/unauthorizedError',
    },
    500: {
      $ref: '#/components/serverError',
    },
  },
};
