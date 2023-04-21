export const authorSingUp = {
  post: {
    tags: ['Author'],
    summary: 'Este endpoint cria um novo author',
    description: 'Esse endpoint pode ser executada por qualquer author',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authorParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Sucesso author criado',
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
      409: {
        $ref: '#/components/conflictError',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
