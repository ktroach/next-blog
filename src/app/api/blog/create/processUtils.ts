import path from "path";
import { cwd } from 'node:process';
import { existsSync } from "node:fs";
import { fork } from 'node:child_process'; 

export const runProc = () => {
  const procPath = `${cwd()}`; 
  const procScript = `${procPath}\\processRunner.sh`; 
  const filePath = path.normalize(procScript);
  console.log(">>> filePath >>> ", filePath); 
  const scriptExists = existsSync(filePath);
  console.log(">>> scriptExists >>> ", scriptExists); 
  if (scriptExists) {
    console.log(">>> running fork >>> ", filePath); 
    const childProcess = fork(filePath);
    childProcess.on("message", (message) => {
      console.log(">>> childProcess.on message >>> ", message);
    });    
  }
}; 

// import { spawn } from 'child_process';

// // this is a little too hacky and needs to be refactored 
// // may want to convert this from Promise based to async based syntax and return the return code
// // so that the caller can know if it was successful or not. 
// export const spawnProcess = (
//   command: string,
//   args: string[],
//   options?: import('child_process').SpawnOptions
// ): Promise<void> => {
//   return new Promise<void>((resolve, reject) => {
//     const child = spawn(command, args, options);

//     child.stdout.on('data', (data) => {
//       process.stdout.write(data);
//     });

//     child.stderr.on('data', (data) => {
//       process.stderr.write(data);
//     });

//     child.on('close', (code) => {
//       if (code === 0) {
//         resolve();
//       } else {
//         reject(new Error(`Command '${command}' failed with code ${code}`));
//       }
//     });
//   });
// };