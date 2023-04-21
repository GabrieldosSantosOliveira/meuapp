export const authorSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    email: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    googleId: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    picture: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};
