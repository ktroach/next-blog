import fs from 'fs/promises';
import { randomBytes } from 'crypto';

async function generateUniqueFilename(extension = '') {
  const randomBuffer = await randomBytes(4);
  const randomString = randomBuffer.toString('hex');
  const timestamp = Date.now();
  const filename = `${timestamp}${randomString}`;
  const uniqueFilename = `${filename.slice(0, 16)}${extension}`
  return uniqueFilename;
}

export default generateUniqueFilename;