export const noticeByCategory = {
  get: {
    tags: ['Noticia'],
    summary: 'Este endpoint lista as noticias de uma categoria',
    description: 'Esse endpoint pode ser executada por qualquer author',
    parameters: [
      {
        name: 'categoryTitle',
        in: 'path',
        description: 'titulo da categoria',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/noticePagination',
            },
          },
        },
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
