import { execFile } from 'child_process';
import path from 'path';

execFile(path.resolve(process.cwd(), './bat.cmd'), null, (err, stdout) => {
    console.log(stdout.toString())
})