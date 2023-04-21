export const authorGoogle = {
  post: {
    tags: ['Author'],
    summary:
      'Este endpoint cria um novo usuário utilizando login social com o google',
    description: 'Esse endpoint pode ser executada por qualquer author',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authorParamsGoogle',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorizedError',
      },

      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
