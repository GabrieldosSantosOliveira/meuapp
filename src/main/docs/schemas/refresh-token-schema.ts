export const refreshTokenSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
  },
  required: ['accessToken'],
};
