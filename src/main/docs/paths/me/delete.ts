export const deleteAuthor = {
  tags: ['Author'],
  summary: 'Este endpoint remove um author',
  description: 'Esse endpoint necessita de autenticação',
  security: [
    {
      bearerAuth: [],
    },
  ],
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
