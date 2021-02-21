import { exec, ExecOptions } from "child_process";
import { BaseEncodingOptions } from 'fs';

export function execPromise(cmd: string, options?: BaseEncodingOptions & ExecOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout.toString());
            }
        });
    });
}