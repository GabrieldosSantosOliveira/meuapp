export const oneNotice = {
  get: {
    tags: ['Noticia'],
    summary: 'Este endpoint visualiza uma única noticia',
    description: 'Esse endpoint pode ser executada por qualquer author',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'id da noticia',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/notice',
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
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
