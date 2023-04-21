export const refreshToken = {
  post: {
    tags: ['Auth'],
    summary: 'Este endpoint gera um novo accessToken',
    description:
      'Esse endpoint pode ser executada por qualquer author com o refreshToken',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/refreshTokenParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso accessToken gerado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/refreshToken',
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
