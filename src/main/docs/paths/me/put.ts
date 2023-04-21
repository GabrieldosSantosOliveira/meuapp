export const put = {
  tags: ['Author'],
  summary: 'Este endpoint atualiza um único author',
  description: 'Esse endpoint necessita de autenticação',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/authorUpdate',
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Sucesso sem conteúdo',
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
