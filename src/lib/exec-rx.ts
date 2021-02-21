import { exec, ExecOptions } from 'child_process';
import { Subject } from 'rxjs';

export const execRx = (cmd: string, options?: ExecOptions, emitStdErr = true) => {
  const observer = new Subject<string>();

  const proc = exec(cmd, options);
  proc.stdout.on('data', (data: any) => observer.next(data?.toString()));
  if (emitStdErr) {
    proc.stderr.on('data', (data: any) => {
      return observer.next(data.toString());
    });
  }
  proc.on('exit', (code: number, signal: string) => code === 0 ? observer.complete() : observer.error(signal));
  proc.on('error', (e: Error) => observer.error(e));

  return observer;
};