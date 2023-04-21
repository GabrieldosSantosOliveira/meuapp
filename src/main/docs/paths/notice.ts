export const notice = {
  get: {
    tags: ['Noticia'],
    summary: 'Este endpoint visualiza todas as noticias',
    description: 'Esse endpoint pode ser executada por qualquer author',
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
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  post: {
    tags: ['Noticia'],
    summary: 'Este endpoint cria uma nova noticia',
    description:
      'Esse endpoint pode ser executada somente por usuários autenticados',
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
            $ref: '#/schemas/noticeParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Sucesso noticia criada',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/notice',
            },
          },
        },
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
