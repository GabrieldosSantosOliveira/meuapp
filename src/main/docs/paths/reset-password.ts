export const resetPassword = {
  post: {
    tags: ['Auth'],
    summary: 'Este endpoint redefini a sua senha',
    description:
      'Esse endpoint pode ser executada por qualquer author que possuem o token enviado enviado pela rota forgot-password para o email',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/resetPasswordParams',
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
      401: {
        $ref: '#/components/unauthorizedError',
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
