import { createHash } from 'crypto';

export const generateHash = (input: any, length = 10) => {
  const hash = createHash('sha256').update(input).digest('hex');
  return hash.substring(0, length);
};
