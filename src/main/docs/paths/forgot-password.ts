export const forgotPassword = {
  post: {
    tags: ['Auth'],
    summary: 'Este endpoint envia um token para o email para redefinição senha',
    description: 'Esse endpoint pode ser executada por qualquer author',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/forgotPasswordParams',
          },
        },
      },
    },
    responses: {
      204: {
        description:
          'Sucesso token de redefinição de senha enviado para o email',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
