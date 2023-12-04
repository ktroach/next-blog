import { spawn } from 'child_process';

export const spawnProcess = (
  command: string,
  args: string[],
  options?: import('child_process').SpawnOptions
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, options);

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command '${command}' failed with code ${code}`));
      }
    });
  });
};