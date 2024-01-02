import { randomBytes } from 'crypto';

export const generateUniqueFilename =  (fileExtension = '') => {
  const randomBuffer =  randomBytes(4);
  const randomString = randomBuffer.toString('hex');
  const timestamp = Date.now();
  const filename = `${timestamp}${randomString}`;
  return `${filename.slice(0, 16)}${fileExtension}`;
}; 
