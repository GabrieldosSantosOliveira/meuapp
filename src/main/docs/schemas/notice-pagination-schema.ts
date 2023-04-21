export const noticePaginationSchema = {
  type: 'object',
  properties: {
    info: {
      $ref: '#/schemas/info',
    },
    data: {
      $ref: '#/schemas/notice',
    },
  },
  required: ['info', 'data'],
};
