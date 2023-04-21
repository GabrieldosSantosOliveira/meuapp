export const authorParams = {
  type: 'object',
  properties: {
    lastName: { type: 'string' },
    picture: { type: 'string' },
    firstName: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['lastName', 'firstName', 'email'],
};
