import { BcryptAdapter } from '@/infra/cryptography';

const bcryptAdapter = new BcryptAdapter(12);
export { bcryptAdapter };
