import { components } from './components';
import paths from './paths';
import { schemas } from './schemas';
export default {
  openapi: '3.0.0',
  info: {
    title: 'Api de Noticias',
    description:
      'Esta é documentação da api desenvolvida por Gabriel dos Santos Oliveira utilizando os princípios do solid, clean architecture e testes',
    version: '1.0.0',
    contact: {
      name: 'Gabriel dos Santos Oliveira',
      url: 'https://www.linkedin.com/in/gabriel-dos-santos-oliveira-24b67b243/',
      email: 'gabrielsantosoliveira951@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/license/mit/',
    },
    tags: [
      {
        name: 'Noticia',
        description: 'endpoints relacionados a noticia',
      },
      {
        name: 'Auth',
        description: 'endpoints relacionados a auth',
      },
      {
        name: 'Autor',
        description: 'endpoints relacionados a autor',
      },
      {
        name: 'Category',
        description: 'endpoints relacionados a categoria',
      },
      {
        name: 'Auth',
        description: 'endpoints relacionados a autenticação',
      },
    ],
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  paths,
  components,
  schemas,
};
